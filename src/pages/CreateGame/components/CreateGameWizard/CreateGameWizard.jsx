import React, { useState } from "react";
import PlayerList from "../../../../general/components/PlayerList/PlayerList";
import { createParty, startGame } from "../../utils/createGameUtils";
import FeatherIcon from "feather-icons-react";

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
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:opacity-50"
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
        <div className="flex justify-between m-4 ">
          <p className="m-auto">Room Code:&nbsp;</p>
          <div className="flex">
            <b className="m-auto">{roomCode}&nbsp;</b>
            <button
              className="block m-auto bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow"
              onClick={() => {
                navigator.clipboard.writeText(roomCode);
              }}
            >
              <FeatherIcon icon="clipboard" alt="Copy room code" />
            </button>
          </div>
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
