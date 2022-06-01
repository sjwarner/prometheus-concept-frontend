import React from "react";
import Caption from "../Caption/Caption";

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

  return (
    <div className="mt-4 mb-4">
      {winner && (
        <Caption>
          🎉 {winner === Players.WHITE ? "Player One" : "Player Two"} won! 🎉
        </Caption>
      )}
      {inProgress && !playerOneSpherePlaced && (
        <Caption>Place Player One's sphere.</Caption>
      )}
      {inProgress && playerOneSpherePlaced && !playerTwoSpherePlaced && (
        <Caption>Place Player Two's sphere.</Caption>
      )}
      {inProgressWithSpheresPlaced && (
        <Caption>{turn === Players.WHITE ? "White" : "Black"}'s turn.</Caption>
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
