import React from "react";
import Caption from "../../../general/components/Caption/Caption";
import Button from "../../../general/components/Button/Button";

const OnlineBoardCaption = ({
  inProgress,
  isPlayerTurn,
  isSpherePlaced,
  isGameDrawn,
  winner,
  hasResigned,
  hasOpponentResigned,
  hasRequestedRematch,
  hasOpponentRequestedRematch,
  requestRematch,
}) => {
  return (
    <div className="mt-4 mb-4">
      {inProgress && isPlayerTurn && !isSpherePlaced && (
        <Caption>Place your sphere.</Caption>
      )}
      {inProgress && isPlayerTurn && isSpherePlaced && (
        <Caption>Make your move!</Caption>
      )}
      {inProgress && !isPlayerTurn && (
        <Caption>Waiting for opponent...</Caption>
      )}
      {winner && <Caption>🎉 {winner} won! 🎉</Caption>}
      {hasResigned && <Caption>You resigned.</Caption>}
      {hasOpponentResigned && (
        <Caption>🎉 You win, opponent resigned! 🎉</Caption>
      )}
      {isGameDrawn && <Caption>Game drawn!</Caption>}
      {!inProgress && (
        <Button onClick={() => requestRematch()} disabled={hasRequestedRematch}>
          Rematch?
        </Button>
      )}
      {!inProgress && hasRequestedRematch && (
        <Caption>Requested rematch. Waiting for opponent...</Caption>
      )}
      {!inProgress && hasOpponentRequestedRematch && (
        <Caption>Opponent has requested rematch.</Caption>
      )}
    </div>
  );
};

export default OnlineBoardCaption;
