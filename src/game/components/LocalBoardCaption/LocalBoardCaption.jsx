import React from "react";
import Caption from "../../../general/components/Caption/Caption";
import Button from "../../../general/components/Button/Button";

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
        <Button onClick={() => resetGame()}>
          {winner ? "Play again?" : "Start!"}
        </Button>
      )}
    </div>
  );
};

export default LocalBoardCaption;
