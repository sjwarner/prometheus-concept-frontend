import React, { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

import OnlinePrometheusBoard from "../../game/components/OnlinePrometheusBoard/OnlinePrometheusBoard";
import CreateGameWizard from "./components/CreateGameWizard/CreateGameWizard";

import Players from "../../game/logic/Players";
import {Link} from "react-router-dom";

const CreateGamePage = () => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState(null);
  const [isInRoom, setIsInRoom] = useState(false);
  const [canStart, setCanStart] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [players, setPlayers] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isDisconnected, setIsDisconnected] = useState(false);

  const joinParty = useCallback(() => {
    socket.emit("setName", username);

    socket.on("joinSuccess", () => {
      setIsLoading(false);
      setIsInRoom(true);
    });

    socket.on("joinFailed", (err) => {
      console.log("join failed, cause: " + err);
      setIsLoading(false);
    });

    socket.on("leader", () => {});

    socket.on("partyUpdate", (players) => {
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

    socket.on("connect", () => {
      console.log("You've connected to the server");
      setIsDisconnected(false);
    });

    socket.on("disconnect", () => {
      console.log("You've lost connection with the server");
      setIsDisconnected(true);
      socket.close();
    });
  }, [socket, username]);

  useEffect(() => {
    if (roomCode) {
      const newSocket = io.connect(`${baseUrl}/${roomCode}`, {
        transports: ["websocket"],
      });

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
        <CreateGameWizard
          baseUrl={baseUrl}
          username={username}
          setUsername={setUsername}
          roomCode={roomCode}
          setRoomCode={setRoomCode}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isInRoom={isInRoom}
          players={players}
          setPlayers={setPlayers}
          canStart={canStart}
          socket={socket}
          setIsGameStarted={setIsGameStarted}
        />
      )}
      {isGameStarted && (
        <OnlinePrometheusBoard
          socket={socket}
          isGameStarted={isGameStarted}
          initialPlayerNumber={
            players.findIndex((player) => player.name === username) === 0
              ? Players.WHITE
              : Players.BLACK
          }
          players={players}
          username={username}
        />
      )}
      {isDisconnected && (
        <div className="fixed w-full h-screen bg-gray-900 bg-opacity-50">
          <div className="modal-dialog relative w-auto m-4 pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md bg-red-200">
                <h5
                  className="text-xl font-medium leading-normal text-gray-800"
                  id="exampleModalLabel"
                >
                  Error
                </h5>
              </div>
              <div className="modal-body relative p-4">
                Disconnected from server.
                <br />
                Game will be terminated.
                <br />
              </div>
              <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-around p-4 border-t border-gray-200 rounded-b-md">
                <Link
                    className="block bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    to="/"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGamePage;
