import React from "react";
import Caption from "../Caption/Caption";

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
        <button
          className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            requestRematch();
          }}
          disabled={hasRequestedRematch}
        >
          Rematch?
        </button>
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
