import React, { useState } from "react";
import Button from "../../../../general/components/Button/Button";
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
        <Button
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
        </Button>
      )}

      {roomCode && (
        <div className="flex justify-between m-4 ">
          <p className="m-auto">Room Code:&nbsp;</p>
          <div className="flex">
            <b className="m-auto">{roomCode}&nbsp;</b>
            <Button onClick={() => navigator.clipboard.writeText(roomCode)}>
              <FeatherIcon icon="clipboard" alt="Copy room code" />
            </Button>
          </div>
        </div>
      )}

      {isInRoom && (
        <PlayerList socket={socket} players={players} setPlayers={setPlayers} />
      )}

      {canStart && (
        <Button onClick={() => startGame(socket, players, setIsGameStarted)}>
          Start Game
        </Button>
      )}
    </div>
  );
};

export default CreateGameWizard;
