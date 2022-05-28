import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import PlayerList from "../../general/components/PlayerList/PlayerList";
import OnlinePrometheusBoard from "../../game/components/OnlinePrometheusBoard/OnlinePrometheusBoard";

import Players from "../../game/logic/Players";

const CreateGamePage = () => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState(null);
  const [isInRoom, setIsInRoom] = useState(false);
  const [canStart, setCanStart] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [players, setPlayers] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createParty = (username) => {
    if (!username) {
      setErrorMessage("Username must be set");
      setHasError(true);
      return;
    }

    setHasError(false);
    setIsLoading(true);

    axios
      .get(`${baseUrl}/createNamespace`)
      .then((res) => {
        setIsLoading(false);
        setRoomCode(res.data.namespace);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setErrorMessage("Error creating room, server is unreachable");
        setHasError(true);
      });
  };

  const joinParty = useCallback(() => {
    console.log("Joining party");
    socket.emit("setName", username);

    socket.on("joinSuccess", () => {
      console.log("join successful");
      setIsLoading(false);
      setIsInRoom(true);
    });

    socket.on("joinFailed", (err) => {
      console.log("join failed, cause: " + err);
      setIsLoading(false);
    });

    socket.on("leader", function () {
      console.log("You are the leader");
    });

    socket.on("partyUpdate", (players) => {
      console.log(players);
      setPlayers(players);

      const readyPlayers = players
        ?.map((player) => player.isReady)
        .filter((isReady) => isReady === true).length;

      if (players.length === 2 && readyPlayers === players.length) {
        setCanStart(true);
      } else {
        setCanStart(false);
      }
    });

    socket.on("disconnected", function () {
      console.log("You've lost connection with the server");
    });
  }, [socket, username]);

  const startGame = () => {
    socket.emit("startGameSignal", players);

    socket.on("startGame", () => {
      setIsGameStarted(true);
    });
  };

  useEffect(() => {
    if (roomCode) {
      const newSocket = io.connect(`${baseUrl}/${roomCode}`, {
        transports: ["websocket"],
      });

      console.log(newSocket);
      setSocket(newSocket);
    }
  }, [baseUrl, roomCode]);

  useEffect(() => {
    if (socket) {
      joinParty();
    }
  }, [socket, joinParty]);

  return (
    <div className="app p-8 flex flex-col justify-center items-center h-screen">
      {!isGameStarted && (
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            disabled={isInRoom}
            onChange={(evt) => setUsername(evt.target.value)}
          />
          {hasError && <div className="mt-4">{errorMessage}</div>}
          {!isLoading && !roomCode && (
            <button
              className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => createParty(username)}
            >
              Create game
            </button>
          )}

          {roomCode && (
            <div>
              <p>
                ROOM CODE: <br></br> <br></br>
                <b className="" onClick={() => {}}>
                  {roomCode}
                </b>
              </p>
              {/*{this.state.copied ? <p>Copied to clipboard</p> : null}*/}
            </div>
          )}

          {isInRoom && <PlayerList players={players} setPlayers={setPlayers} />}

          {canStart && (
            <button
              className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => startGame()}
            >
              Start Game
            </button>
          )}
        </div>
      )}

      {isGameStarted && (
        <OnlinePrometheusBoard
          isGameStarted={isGameStarted}
          playerNum={
            players.findIndex((player) => player.name === username) === 0
              ? Players.PLAYER_ONE
              : Players.PLAYER_TWO
          }
        />
      )}
    </div>
  );
};

export default CreateGamePage;
