import React, { useState } from "react";
import "../../App.css";

import PrometheusBoard from "../../game/components/PrometheusBoard/PrometheusBoard";
import Players from "../../game/logic/Players";
import InitialGameState from "../../game/logic/InitialGameState";

const LocalMultiplayerPage = () => {
  const [inProgress, setInProgress] = useState(false);
  const [playerOneSpherePlaced, setPlayerOneSpherePlaced] = useState(false);
  const [playerTwoSpherePlaced, setPlayerTwoSpherePlaced] = useState(false);
  // Stringify hack to deep clone InitialGameState - avoids mutation.
  const [gameState, setGameState] = useState(
    JSON.parse(JSON.stringify(InitialGameState))
  );
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState(Players.PLAYER_ONE);

  const inProgressWithSpheresPlaced =
    inProgress && playerOneSpherePlaced && playerTwoSpherePlaced;

  const resetGame = () => {
    setInProgress(true);
    setWinner(null);
    setGameState(JSON.parse(JSON.stringify(InitialGameState)));
    setPlayerOneSpherePlaced(false);
    setPlayerTwoSpherePlaced(false);
  };

  return (
    <div className="app p-8 flex flex-col justify-center items-center h-screen">
      <PrometheusBoard
        inProgress={inProgress}
        setInProgress={setInProgress}
        playerOneSpherePlaced={playerOneSpherePlaced}
        playerTwoSpherePlaced={playerTwoSpherePlaced}
        setPlayerOneSpherePlaced={setPlayerOneSpherePlaced}
        setPlayerTwoSpherePlaced={setPlayerTwoSpherePlaced}
        gameState={gameState}
        setGameState={setGameState}
        turn={turn}
        setTurn={setTurn}
        setWinner={setWinner}
      />
      <div className="below-board-container mt-4">
        {winner && (
          <span className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4">
            {winner === Players.PLAYER_ONE ? "Player One" : "Player Two"} won!
          </span>
        )}
        {inProgress && !playerOneSpherePlaced && (
          <span className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4">
            Place Player One's sphere.
          </span>
        )}
        {inProgress && playerOneSpherePlaced && !playerTwoSpherePlaced && (
          <span className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4">
            Place Player Two's sphere.
          </span>
        )}
        {inProgressWithSpheresPlaced && (
          <span className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4">
            {turn === Players.PLAYER_ONE ? "White" : "Black"}'s turn.
          </span>
        )}
        {!inProgress && (
          <button
            className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => resetGame()}
          >
            {winner ? "Play again?" : "Start!"}
          </button>
        )}
      </div>
    </div>
  );
};

export default LocalMultiplayerPage;
