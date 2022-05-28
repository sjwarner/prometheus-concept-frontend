import React, {useEffect, useState} from "react";
import axios from "axios";
import {io} from "socket.io-client";

const JoinGamePage = () => {
    const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
    const [socket, setSocket] = useState(null);
    const [username, setUsername] = useState("");
    const [roomCode, setRoomCode] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const [isInRoom, setIsInRoom] = useState(false);
    const [canStart, setCanStart] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [players, setPlayers] = useState(null);

    const [errorMessage, setErrorMessage] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const newSocket = io.connect(`${baseUrl}/${roomCode}`, {
            transports: ["websocket"]
        });

        console.log(newSocket);
        setSocket(newSocket);
    }, [baseUrl, roomCode])

    const joinParty = () => {
        socket.emit("setName", username);

        socket.on("joinSuccess", function () {
            console.log("join successful");

            setIsLoading(false);
            setIsInRoom(true);
        });

        socket.on("joinFailed", function (err) {
            console.log("join failed, cause: " + err);

            setErrorMessage(err);
            setHasError(true);
            setIsLoading(false);

            socket.disconnect();
        });

        socket.on("startGame", () => {
            setIsGameStarted(true);
        });

        socket.on("partyUpdate", (participants) => {
            console.log(participants);
            setPlayers(participants);

            const readyPlayers = players.map((player) => player.isReady).filter((x) => x === true).length;

            if (players.length === 2 && readyPlayers === players.length) {
                setCanStart(true);
            } else {
                setCanStart(false);
            }
        });

        socket.on("disconnected", function () {
            console.log("You've lost connection with the server");
        });
    };

    const attemptJoinParty = () => {
        if (!username) {
            console.log("Please enter a name");

            setErrorMessage("Name must be set");
            setHasError(true);
            return;
        }

        if (!roomCode) {
            console.log("Please enter a room code");

            setErrorMessage("Room code must be specified");
            setHasError(true);
            return;
        }

        setIsLoading(true);

        axios
            .get(`${baseUrl}/exists/${roomCode}`)
            .then(function (res) {
                console.log(res);

                if (res.data.exists) {
                    // Join the room
                    console.log("joining");

                    // TODO: Do we need to reset this here?
                    // setIsLoading(false);
                    setErrorMessage("");
                    joinParty();
                } else {
                    //TODO  handle error
                    console.log("Invalid Party Code");

                    setIsLoading(false);
                    setErrorMessage("Invalid Party Code")
                    setHasError(true);
                }
            })
            .catch(function (err) {
                console.log("Error in getting exists", err);

                setIsLoading(false);
                setErrorMessage("Server error")
                setHasError(true);
            });
    };

    const reportReady = () => {
        socket.emit("setReady", true);
        socket.on("readyConfirm", () => {
            setIsReady(true);
        });
    };

    return (
        <div className="app p-8 flex flex-col justify-center items-center h-screen">
            <div className="mb-4">
                {!isGameStarted && (
                    <>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username" type="text" placeholder="Username" disabled={isInRoom}
                            onChange={(evt) => setUsername(evt.target.value)}/>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Room Code
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="roomCode" type="text" placeholder="Room Code" disabled={isInRoom}
                            onChange={(evt) => setRoomCode(evt.target.value)}/>
                        {hasError && (
                            <div className="mt-4">{errorMessage}</div>
                        )}
                        {!isLoading && !isInRoom && (
                            <button
                                className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                                onClick={() => attemptJoinParty()}
                                disabled={isLoading}
                            >
                                Join game
                            </button>
                        )}

                        {isInRoom && !isReady && (
                            <button
                                className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                                onClick={() => reportReady()}
                                disabled={isReady}
                            >
                                Ready up!
                            </button>
                        )}
                        {isInRoom && isReady && (
                            <p className="block text-gray-700 m-4">Waiting for host...</p>
                        )}
                    </>
                )}

                {isGameStarted && (
                    <p>Game started!</p>
                )}
            </div>
        </div>
    );
}

export default JoinGamePage;
