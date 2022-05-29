import React, { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

import OnlinePrometheusBoard from "../../game/components/OnlinePrometheusBoard/OnlinePrometheusBoard";
import CreateGameWizard from "./components/CreateGameWizard/CreateGameWizard";

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

  const [isLoading, setIsLoading] = useState(false);

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

    socket.on("disconnect", () => {
      console.log("You've lost connection with the server");
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
    </div>
  );
};

export default CreateGamePage;
