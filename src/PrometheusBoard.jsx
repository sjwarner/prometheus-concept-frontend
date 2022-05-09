import React, {useEffect, useState} from 'react';
import PrometheusSquare from "./PrometheusSquare";
import Pieces from "./game/logic/Pieces";
import Players from "./game/logic/Players";
import {calculateValidMoves, isArrayInArray} from "./game/logic/utils";

const PrometheusBoard = (
    {
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
      setWinner
    }
  ) => {

  const [originRank, setOriginRank] = useState(null);
  const [originFile, setOriginFile] = useState(null);
  const [playerOneFirstTurn, setPlayerOneFirstTurn] = useState(true);
  const [playerTwoFirstTurn, setPlayerTwoFirstTurn] = useState(true);
  const [validMoves, setValidMoves] = useState([]);

  useEffect(() => {
    setPlayerOneFirstTurn(true);
    setPlayerTwoFirstTurn(true);
  }, [inProgress])

  const makeMove = (rank, file) => {
    !playerOneSpherePlaced
      ? addPlayerOneSphere(rank, file)
      : !playerTwoSpherePlaced
        ? addPlayerTwoSphere(rank, file)
        : originRank === null && originFile === null
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
      calculateValidMoves(rank, file, gameState, setValidMoves, playerOneFirstTurn, playerTwoFirstTurn);
    }
  };

  const clearCandidatePiece = () => {
    setOriginRank(null);
    setOriginFile(null);
    setValidMoves([]);
  }

  const movePiece = (destinationRank, destinationFile) => {
    if (isArrayInArray(validMoves, [destinationRank, destinationFile])) {
      let tmp = gameState;
      if (gameState[destinationRank][destinationFile].toUpperCase() === "S") {
        setWinner(turn);
        setInProgress(false);
      }
      if (playerOneFirstTurn && turn === Players.PLAYER_ONE) {
        setPlayerOneFirstTurn(false)
      }
      if (playerTwoFirstTurn && turn === Players.PLAYER_TWO) {
        setPlayerTwoFirstTurn(false)
      }
      tmp[destinationRank][destinationFile] = gameState[originRank][originFile];
      tmp[originRank][originFile] = ""
      setGameState(tmp);
      setOriginRank(null);
      setOriginFile(null);
      setValidMoves([]);
      setTurn(turn === Players.PLAYER_ONE ? Players.PLAYER_TWO : Players.PLAYER_ONE)
    }
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
