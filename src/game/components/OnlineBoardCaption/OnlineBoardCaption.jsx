import React from "react";

const OnlineBoardCaption = ({inProgress, isPlayerTurn, isSpherePlaced, winner, hasOpponentRequestedRematch, requestRematch}) => {
    return (
        <div className="below-board-container mt-4">
            {inProgress && isPlayerTurn && !isSpherePlaced && (
                <span className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4">
              Place your sphere.
            </span>
            )}
            {inProgress && isPlayerTurn && isSpherePlaced && (
                <span className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4">
              Make your move!
            </span>
            )}
            {inProgress && !isPlayerTurn && (
                <span className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4">
              Waiting for opponent...
            </span>
            )}
            {winner && (
                <span className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4">
              {winner} won!
            </span>
            )}
            {!inProgress && (
                <button
                    className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    onClick={() => requestRematch()}
                >
                    Rematch?
                </button>
            )}
            {!inProgress && hasOpponentRequestedRematch && (
                <span className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4">
              Opponent has requested rematch.
            </span>
            )}
        </div>
    )
};

export default OnlineBoardCaption;