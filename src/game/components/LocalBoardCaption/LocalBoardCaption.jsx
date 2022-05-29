import React from "react";
import Players from "../../logic/Players";
import { InitialGameStateWhite } from "../../logic/InitialGameState";

const LocalBoardCaption = ({
  inProgress,
  setInProgress,
  winner,
  setWinner,
  setGameState,
  turn,
  playerOneSpherePlaced,
  setPlayerOneSpherePlaced,
  playerTwoSpherePlaced,
  setPlayerTwoSpherePlaced,
}) => {
  const resetGame = () => {
    setInProgress(true);
    setWinner(null);
    setGameState(JSON.parse(JSON.stringify(InitialGameStateWhite)));
    setPlayerOneSpherePlaced(false);
    setPlayerTwoSpherePlaced(false);
  };

  const inProgressWithSpheresPlaced =
    inProgress && playerOneSpherePlaced && playerTwoSpherePlaced;

  console.log(inProgress);

  return (
    <div className="below-board-container mt-4">
      {winner && (
        <span className="block m-auto mt-4 bg-white text-gray-800 py-2 px-4">
          🎉 {winner === Players.WHITE ? "Player One" : "Player Two"} won! 🎉
        </span>
      )}
      {inProgress && !playerOneSpherePlaced && (
        <span className="block m-auto mt-4 bg-white text-gray-800 py-2 px-4">
          Place Player One's sphere.
        </span>
      )}
      {inProgress && playerOneSpherePlaced && !playerTwoSpherePlaced && (
        <span className="block m-auto mt-4 bg-white text-gray-800 py-2 px-4">
          Place Player Two's sphere.
        </span>
      )}
      {inProgressWithSpheresPlaced && (
        <span className="block m-auto mt-4 bg-white text-gray-800 py-2 px-4">
          {turn === Players.WHITE ? "White" : "Black"}'s turn.
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
  );
};

export default LocalBoardCaption;
