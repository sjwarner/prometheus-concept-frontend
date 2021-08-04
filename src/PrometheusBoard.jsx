import React, {useState} from 'react';
import PrometheusSquare from "./PrometheusSquare";
import InitialGameState from "./InitialGameState";
import Pieces from "./Pieces";
import Players from "./Players";
import {calculateValidMoves, isArrayInArray} from "./utils";

const PrometheusBoard = (
    {
      inProgress,
      playerOneSpherePlaced,
      playerTwoSpherePlaced,
      setPlayerOneSpherePlaced,
      setPlayerTwoSpherePlaced,
      turn,
      setTurn
    }
  ) => {
  const [gameState, setGameState] = useState(InitialGameState);
  const [originRank, setOriginRank] = useState(null);
  const [originFile, setOriginFile] = useState(null);
  const [validMoves, setValidMoves] = useState([]);

  const makeMove = (rank, file) => {
    !playerOneSpherePlaced
      ? addPlayerOneSphere(rank, file)
      : !playerTwoSpherePlaced
        ? addPlayerTwoSphere(rank, file)
        : !originRank && !originFile
          ? selectCandidatePiece(rank, file)
          : (originRank === rank && originFile === file)
            ? clearCandidatePiece()
            : movePiece(rank, file)
  }

  const addPlayerOneSphere = (rank, file) => {
    // Sphere has to replace one of Player One's pieces.
    let selectedSquare = gameState[rank][file];
    if (selectedSquare && selectedSquare === selectedSquare.toUpperCase()) {
      let tmp = gameState;
      tmp[rank][file] = Pieces.WHITE_SPHERE;
      setGameState(tmp);
      setPlayerOneSpherePlaced(true);
    }
  }

  const addPlayerTwoSphere = (rank, file) => {
    // Sphere has to replace one of Player Two's pieces.
    let selectedSquare = gameState[rank][file];
    if (selectedSquare && selectedSquare === selectedSquare.toLowerCase()) {
      let tmp = gameState;
      tmp[rank][file] = Pieces.BLACK_SPHERE;
      setGameState(tmp);
      setPlayerTwoSpherePlaced(true);
    }
  }

  const selectCandidatePiece = (rank, file) => {
    let candidatePiece = gameState[rank][file];
    if ((turn === Players.PLAYER_ONE && candidatePiece && candidatePiece === candidatePiece.toUpperCase())
      || (turn === Players.PLAYER_TWO && candidatePiece && candidatePiece === candidatePiece.toLowerCase())) {
      setOriginRank(rank);
      setOriginFile(file);
      calculateValidMoves(rank, file, gameState, setValidMoves);
    }
  };

  const clearCandidatePiece = () => {
    setOriginRank(null);
    setOriginFile(null);
    setValidMoves([]);
  }

  const movePiece = (destinationRank, destinationFile) => {
    let tmp = gameState;
    tmp[destinationRank][destinationFile] = gameState[originRank][originFile];
    tmp[originRank][originFile] = ""
    setGameState(tmp);
    setOriginRank(null);
    setOriginFile(null);
    setValidMoves([]);
    setTurn(turn === Players.PLAYER_ONE ? Players.PLAYER_TWO : Players.PLAYER_ONE)
  };

  return (
    <div className="board">
      <div className="content">
        {Array(8).fill(1).map((el, x) => {
          return (
            <div id={`rank-${x}`} className="board-row flex flex-row" key={x}>
              {Array(8).fill(1).map((el, y) => {
                return (
                  <PrometheusSquare colour={(x + y) % 2 === 0 ? "black" : "white"} piece={gameState[x][y]}
                                    selected={x === originRank && y === originFile} valid={isArrayInArray(validMoves, [x,y])}
                                    onClick={() => {if(inProgress) makeMove(x, y)}} key={y} />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default PrometheusBoard;
