import React, { useState } from "react";
import PlayerList from "../../../../general/components/PlayerList/PlayerList";
import { createParty, startGame } from "../../utils/createGameUtils";

const CreateGameWizard = ({
  baseUrl,
  username,
  setUsername,
  roomCode,
  setRoomCode,
  isLoading,
  setIsLoading,
  isInRoom,
  players,
  setPlayers,
  canStart,
  socket,
  setIsGameStarted,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  return (
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
          onClick={() =>
            createParty(
              baseUrl,
              username,
              setErrorMessage,
              setHasError,
              setIsLoading,
              setRoomCode
            )
          }
        >
          Create game
        </button>
      )}

      {roomCode && (
        <div className="m-4">
          {/* TODO: Make this easily copy/sendable */}
          <p>
            ROOM CODE:{" "}
            <b className="" onClick={() => {}}>
              {roomCode}
            </b>
          </p>
        </div>
      )}

      {isInRoom && <PlayerList players={players} setPlayers={setPlayers} />}

      {canStart && (
        <button
          className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => startGame(socket, players, setIsGameStarted)}
        >
          Start Game
        </button>
      )}
    </div>
  );
};

export default CreateGameWizard;
