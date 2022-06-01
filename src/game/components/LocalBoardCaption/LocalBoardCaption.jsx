import React, { useState } from "react";
import Caption from "../../../general/components/Caption/Caption";
import Button from "../../../general/components/Button/Button";

import Players from "../../logic/Players";
import {
  InitialGameStateWhite,
  InitialRandomGameStateWhite,
} from "../../logic/InitialGameState";
import GameModes from "../../logic/GameModes";

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
  const [previousGameMode, setPreviousGameMode] = useState(null);

  const resetGame = (gameMode) => {
    setInProgress(true);
    setPreviousGameMode(gameMode);
    setWinner(null);

    if (gameMode === GameModes.ORIGINAL) {
      setGameState(JSON.parse(JSON.stringify(InitialGameStateWhite)));
    } else {
      setGameState(JSON.parse(JSON.stringify(InitialRandomGameStateWhite())));
    }
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
        <div className="flex flex-row mb-4">
          <Button onClick={() => resetGame(GameModes.ORIGINAL)}>
            {winner && previousGameMode === GameModes.ORIGINAL
              ? "Play original again?"
              : "Original Mode"}
          </Button>
          <Button onClick={() => resetGame(GameModes.RANDOM)}>
            {winner && previousGameMode === GameModes.RANDOM
              ? "Play random again?"
              : "Fischer Random"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default LocalBoardCaption;
