import React, { useEffect, useState } from "react";
import PrometheusSquare from "../PrometheusSquare/PrometheusSquare";
import LocalBoardCaption from "../LocalBoardCaption/LocalBoardCaption";
import BoardSidePane from "../BoardSidePane/BoardSidePane";

import Pieces from "../../logic/Pieces";
import Players from "../../logic/Players";

import { calculateValidMoves, isArrayInArray } from "../../logic/utils";

const LocalPrometheusBoard = ({
  inProgress,
  setInProgress,
  playerOneSpherePlaced,
  playerTwoSpherePlaced,
  setPlayerOneSpherePlaced,
  setPlayerTwoSpherePlaced,
  gameState,
  setGameState,
  turn,
  setTurn,
  winner,
  setWinner,
}) => {
  const [originRank, setOriginRank] = useState(null);
  const [originFile, setOriginFile] = useState(null);
  const [playerOneFirstTurn, setPlayerOneFirstTurn] = useState(true);
  const [playerTwoFirstTurn, setPlayerTwoFirstTurn] = useState(true);
  const [validMoves, setValidMoves] = useState([]);

  useEffect(() => {
    setPlayerOneFirstTurn(true);
    setPlayerTwoFirstTurn(true);
  }, [inProgress]);

  const makeMove = (rank, file) => {
    !playerOneSpherePlaced
      ? addPlayerSphere(Players.WHITE, rank, file)
      : !playerTwoSpherePlaced
      ? addPlayerSphere(Players.BLACK, rank, file)
      : originRank === null && originFile === null
      ? selectCandidatePiece(rank, file)
      : originRank === rank && originFile === file
      ? clearCandidatePiece()
      : movePiece(rank, file);
  };

  const addPlayerSphere = (player, rank, file) => {
    // Sphere has to replace one of Player One's pieces.
    let selectedSquare = gameState[rank][file];
    let whitePlayer = player === Players.WHITE;
    let tmp = gameState;

    if (
      selectedSquare &&
      selectedSquare === selectedSquare.toUpperCase() &&
      whitePlayer
    ) {
      tmp[rank][file] = Pieces.WHITE_SPHERE;
      setGameState(tmp);
      setPlayerOneSpherePlaced(true);
    } else if (
      selectedSquare &&
      selectedSquare === selectedSquare.toLowerCase() &&
      !whitePlayer
    ) {
      tmp[rank][file] = Pieces.BLACK_SPHERE;
      setGameState(tmp);
      setPlayerTwoSpherePlaced(true);
    }
  };

  const selectCandidatePiece = (rank, file) => {
    let candidatePiece = gameState[rank][file];
    if (
      (turn === Players.WHITE &&
        candidatePiece &&
        candidatePiece === candidatePiece.toUpperCase()) ||
      (turn === Players.BLACK &&
        candidatePiece &&
        candidatePiece === candidatePiece.toLowerCase())
    ) {
      setOriginRank(rank);
      setOriginFile(file);
      calculateValidMoves(
        rank,
        file,
        gameState,
        setValidMoves,
        playerOneFirstTurn || playerTwoFirstTurn
      );
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
      if (gameState[destinationRank][destinationFile].toUpperCase() === "S") {
        setWinner(turn);
        setInProgress(false);
      }
      if (playerOneFirstTurn && turn === Players.WHITE) {
        setPlayerOneFirstTurn(false);
      }
      if (playerTwoFirstTurn && turn === Players.BLACK) {
        setPlayerTwoFirstTurn(false);
      }
      tmp[destinationRank][destinationFile] = gameState[originRank][originFile];
      tmp[originRank][originFile] = "";
      setGameState(tmp);
      setOriginRank(null);
      setOriginFile(null);
      setValidMoves([]);
      setTurn(turn === Players.WHITE ? Players.BLACK : Players.WHITE);
    }
  };

  return (
    <>
      <div className="board flex flex-row m-auto">
        <div className="content">
          {Array(8)
            .fill(1)
            .map((el, x) => {
              return (
                <div
                  id={`rank-${x}`}
                  className="board-row flex flex-row"
                  key={x}
                >
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
                            if (inProgress) makeMove(x, y);
                          }}
                          key={y}
                        />
                      );
                    })}
                </div>
              );
            })}
          <LocalBoardCaption
            inProgress={inProgress}
            setInProgress={setInProgress}
            winner={winner}
            setWinner={setWinner}
            setGameState={setGameState}
            turn={turn}
            playerOneSpherePlaced={playerOneSpherePlaced}
            setPlayerOneSpherePlaced={setPlayerOneSpherePlaced}
            playerTwoSpherePlaced={playerTwoSpherePlaced}
            setPlayerTwoSpherePlaced={setPlayerTwoSpherePlaced}
          />
        </div>
      </div>
      <BoardSidePane gameState={gameState} />
    </>
  );
};

export default LocalPrometheusBoard;