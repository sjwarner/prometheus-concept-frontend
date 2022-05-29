import React, { useState } from "react";
import { attemptJoinParty, reportReady } from "../../utils/joinGameUtils";

const JoinGameWizard = ({
  baseUrl,
  username,
  setUsername,
  roomCode,
  setRoomCode,
  socket,
  setPlayers,
  setIsGameStarted,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [isInRoom, setIsInRoom] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="username"
      >
        Room Code
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="roomCode"
        type="text"
        placeholder="Room Code"
        disabled={isInRoom}
        onChange={(evt) => setRoomCode(evt.target.value)}
      />
      {hasError && <div className="mt-4">{errorMessage}</div>}
      {!isLoading && !isInRoom && (
        <button
          className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() =>
            attemptJoinParty(
              baseUrl,
              socket,
              username,
              roomCode,
              setErrorMessage,
              setHasError,
              setIsLoading,
              setIsInRoom,
              setPlayers,
              setIsGameStarted
            )
          }
          disabled={isLoading}
        >
          Join game
        </button>
      )}

      {isInRoom && !isReady && (
        <button
          className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => reportReady(socket, setIsReady)}
          disabled={isReady}
        >
          Ready up!
        </button>
      )}
      {isInRoom && isReady && (
        <p className="block text-gray-700 m-4">Waiting for host...</p>
      )}
    </div>
  );
};

export default JoinGameWizard;
