import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import Players from "../../game/logic/Players";
import OnlineBoard from "../../game/components/OnlineBoard/OnlineBoard";
import JoinGameWizard from "./components/JoinGameWizard/JoinGameWizard";
import Modal from "../../general/components/Modal/Modal";

const JoinGamePage = () => {
  const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [initialGameState, setInitialGameState] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [players, setPlayers] = useState(null);

  const [isDisconnected, setIsDisconnected] = useState(false);
  const [disconnectedMessage, setDisconnectedMessage] = useState("");

  useEffect(() => {
    const newSocket = io.connect(`${baseUrl}/${roomCode}`, {
      transports: ["websocket"],
    });

    setSocket(newSocket);
  }, [baseUrl, roomCode]);

  return (
    <div className="app p-8 px-12 flex flex-col lg:flex-row justify-center items-center w-full">
      {!isGameStarted && (
        <JoinGameWizard
          baseUrl={baseUrl}
          socket={socket}
          username={username}
          setUsername={setUsername}
          roomCode={roomCode}
          setRoomCode={setRoomCode}
          setPlayers={setPlayers}
          setGameMode={setGameMode}
          setInitialGameState={setInitialGameState}
          setIsGameStarted={setIsGameStarted}
        />
      )}
      {isGameStarted && (
        <OnlineBoard
          socket={socket}
          isGameStarted={isGameStarted}
          initialPlayerNumber={
            players.findIndex((player) => player.name === username) === 0
              ? Players.WHITE
              : Players.BLACK
          }
          gameMode={gameMode}
          initialGameState={initialGameState}
          players={players}
          username={username}
          setIsDisconnected={setIsDisconnected}
          setDisconnectedMessage={setDisconnectedMessage}
        />
      )}
      {isDisconnected && (
        <Modal type="Error">
          {disconnectedMessage}
          <br />
          Game will be terminated.
          <br />
        </Modal>
      )}
    </div>
  );
};

export default JoinGamePage;
