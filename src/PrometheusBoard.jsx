import React, {useState} from 'react';
import PrometheusSquare from "./PrometheusSquare";
import InitialGameState from "./InitialGameState";
import Pieces from "./Pieces";

const PrometheusBoard = (
    {
      inProgress,
      playerOneSpherePlaced,
      playerTwoSpherePlaced,
      setPlayerOneSpherePlaced,
      setPlayerTwoSpherePlaced
    }
  ) => {
  const [gameState, setGameState] = useState(InitialGameState);
  const [originRank, setOriginRank] = useState(null);
  const [originFile, setOriginFile] = useState(null);

  const makeMove = (rank, file) => {
    !playerOneSpherePlaced
      ? addPlayerOneSphere(rank, file)
      : !playerTwoSpherePlaced
        ? addPlayerTwoSphere(rank, file)
        : !originRank && !originFile
          ? selectCandidatePiece(rank, file)
          : movePiece(rank, file)
  }

  const addPlayerOneSphere = (rank, file) => {
    let tmp = gameState;
    tmp[rank][file] = Pieces.WHITE_SPHERE;
    setGameState(tmp);
    setPlayerOneSpherePlaced(true);
  }

  const addPlayerTwoSphere = (rank, file) => {
    let tmp = gameState;
    tmp[rank][file] = Pieces.BLACK_SPHERE;
    setGameState(tmp);
    setPlayerTwoSpherePlaced(true);
  }

  const selectCandidatePiece = (rank, file) => {
    setOriginRank(rank);
    setOriginFile(file);
  };

  const movePiece = (destinationRank, destinationFile) => {
    let tmp = gameState;
    tmp[destinationRank][destinationFile] = gameState[originRank][originFile];
    tmp[originRank][originFile] = ""
    setGameState(tmp);
    setOriginRank(null);
    setOriginFile(null);
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
