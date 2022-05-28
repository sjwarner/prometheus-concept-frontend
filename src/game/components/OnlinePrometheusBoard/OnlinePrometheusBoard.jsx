import React, { useEffect, useState } from "react";
import PrometheusSquare from "../PrometheusSquare/PrometheusSquare";

import InitialGameState from "../../logic/InitialGameState";
import Pieces from "../../logic/Pieces";
import Players from "../../logic/Players";

import { calculateValidMoves, isArrayInArray } from "../../logic/utils";

const OnlinePrometheusBoard = ({
  socket,
  isGameStarted,
  playerNumber,
  username,
}) => {
  const [inProgress, setInProgress] = useState(isGameStarted);
  const [isPlayerTurn, setIsPlayerTurn] = useState(null);

  const [isSpherePlaced, setIsSpherePlaced] = useState(false);

  // Stringify hack to deep clone InitialGameState - avoids mutation.
  // TODO: Use lodash here instead?
  const [gameState, setGameState] = useState(
    JSON.parse(JSON.stringify(InitialGameState))
  );
  const [winner, setWinner] = useState(null);
  const [hasOpponentRequestedRematch, setHasOpponentRequestedRematch] = useState(false);

  // const inProgressWithSpheresPlaced = inProgress && playerOneSpherePlaced && playerTwoSpherePlaced;

  // const resetGame = () => {
  //     setInProgress(true);
  //     // setWinner(null);
  //     setGameState(JSON.parse(JSON.stringify(InitialGameState)));
  //     setPlayerOneSpherePlaced(false);
  //     setPlayerTwoSpherePlaced(false);
  // }

  const [originRank, setOriginRank] = useState(null);
  const [originFile, setOriginFile] = useState(null);
  const [firstTurn, setFirstTurn] = useState(true);
  const [validMoves, setValidMoves] = useState([]);

  useEffect(() => {
    setFirstTurn(true);
  }, [inProgress]);

  const makeMove = (rank, file) =>
    !isSpherePlaced
      ? addSphere(rank, file)
      : originRank === null && originFile === null
      ? selectCandidatePiece(rank, file)
      : originRank === rank && originFile === file
      ? clearCandidatePiece()
      : movePiece(rank, file);

  socket.on("updatePlayerTurn", (newPlayerTurnUsername) => {
    setIsPlayerTurn(newPlayerTurnUsername === username);
  });

  socket.on("updateGameState", (newGameState) => {
    setGameState(newGameState);
  });

  socket.on("updatePlayerWon", (winningUsername) => {
    setWinner(winningUsername);
    setInProgress(false);
  });

  socket.on("opponentRequestedRematch", () => {
    setHasOpponentRequestedRematch(true);
  });

  const addSphere = (rank, file) => {
    let selectedSquare = gameState[rank][file];

    // Use correct function for either white or black
    const selectedSquareCaseTransformed =
      playerNumber === Players.PLAYER_ONE
        ? selectedSquare.toUpperCase()
        : selectedSquare.toLowerCase();

    if (selectedSquare && selectedSquare === selectedSquareCaseTransformed) {
      let tmp = gameState;
      tmp[rank][file] =
        playerNumber === Players.PLAYER_ONE
          ? Pieces.WHITE_SPHERE
          : Pieces.BLACK_SPHERE;
      setGameState(tmp);
      setIsSpherePlaced(true);

      socket.emit("playerMovedPiece", gameState);
    }
  };

  const selectCandidatePiece = (rank, file) => {
    let candidatePiece = gameState[rank][file];
    if (
      (playerNumber === Players.PLAYER_ONE &&
        candidatePiece &&
        candidatePiece === candidatePiece.toUpperCase()) ||
      (playerNumber === Players.PLAYER_TWO &&
        candidatePiece &&
        candidatePiece === candidatePiece.toLowerCase())
    ) {
      setOriginRank(rank);
      setOriginFile(file);
      calculateValidMoves(rank, file, gameState, setValidMoves, firstTurn);
    }
  };

  const clearCandidatePiece = () => {
    setOriginRank(null);
    setOriginFile(null);
    setValidMoves([]);
  };

  const movePiece = (destinationRank, destinationFile) => {
    if (isArrayInArray(validMoves, [destinationRank, destinationFile])) {
      let tmp = gameState;
      let winningMove = false;
      if (gameState[destinationRank][destinationFile].toUpperCase() === "S") {
        winningMove = true;
      }
      if (firstTurn) {
        setFirstTurn(false);
      }
      tmp[destinationRank][destinationFile] = gameState[originRank][originFile];
      tmp[originRank][originFile] = "";
      setGameState(tmp);
      setOriginRank(null);
      setOriginFile(null);
      setValidMoves([]);

      if (winningMove) {
        socket.emit("playerWon", gameState);
      } else {
        socket.emit("playerMovedPiece", gameState);
      }
    }
  };

  return (
    <div className="board">
      <div className="content">
        {Array(8)
          .fill(1)
          .map((el, x) => {
            return (
              <div id={`rank-${x}`} className="board-row flex flex-row" key={x}>
                {Array(8)
                  .fill(1)
                  .map((el, y) => {
                    return (
                      <PrometheusSquare
                        colour={(x + y) % 2 === 0 ? "black" : "white"}
                        piece={gameState[x][y]}
                        selected={x === originRank && y === originFile}
                        valid={isArrayInArray(validMoves, [x, y])}
                        onClick={() => {
                          if (inProgress && isPlayerTurn) makeMove(x, y);
                        }}
                        key={y}
                      />
                    );
                  })}
              </div>
            );
          })}
        <div className="below-board-container mt-4">
          {winner && (
            <span className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 py-2 px-4">
              {winner} won!
            </span>
          )}
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
          {!inProgress && (
            <button
              className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => {
                socket.emit("requestRematch", username);
              }}
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
      </div>
    </div>
  );
};

export default OnlinePrometheusBoard;
