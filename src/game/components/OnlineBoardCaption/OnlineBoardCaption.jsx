import React from "react";

const OnlineBoardCaption = ({
  inProgress,
  isPlayerTurn,
  isSpherePlaced,
  winner,
  hasResigned,
  hasOpponentResigned,
  hasRequestedRematch,
  hasOpponentRequestedRematch,
  requestRematch,
}) => {
  return (
    <div className="mt-4">
      {inProgress && isPlayerTurn && !isSpherePlaced && (
        <span className="block m-auto mt-4 bg-white text-gray-800 py-2 px-4">
          Place your sphere.
        </span>
      )}
      {inProgress && isPlayerTurn && isSpherePlaced && (
        <span className="block m-auto mt-4 bg-white text-gray-800 py-2 px-4">
          Make your move!
        </span>
      )}
      {inProgress && !isPlayerTurn && (
        <span className="block m-auto mt-4 bg-white text-gray-800 py-2 px-4">
          Waiting for opponent...
        </span>
      )}
      {winner && (
        <span className="block m-auto mt-4 bg-white text-gray-800 py-2 px-4">
          🎉 {winner} won! 🎉
        </span>
      )}
      {hasResigned && (
        <span className="block m-auto mt-4 bg-white text-gray-800 py-2 px-4">
          You resigned.
        </span>
      )}
      {hasOpponentResigned && (
        <span className="block m-auto mt-4 bg-white text-gray-800 py-2 px-4">
          🎉 You win, opponent resigned! 🎉
        </span>
      )}
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
        <span className="block m-auto mt-4 bg-white text-gray-800 py-2 px-4">
          Requested rematch. Waiting for opponent...
        </span>
      )}
      {!inProgress && hasOpponentRequestedRematch && (
        <span className="block m-auto mt-4 bg-white text-gray-800 py-2 px-4">
          Opponent has requested rematch.
        </span>
      )}
    </div>
  );
};

export default OnlineBoardCaption;
