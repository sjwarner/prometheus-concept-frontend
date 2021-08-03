import React, {useState} from 'react';
import PrometheusSquare from "./PrometheusSquare";
import InitialGameState from "./InitialGameState";

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
    tmp[rank][file] = "s"
    setGameState(tmp);
    setPlayerOneSpherePlaced(true);
    console.log("adding player one sphere");
  }

  const addPlayerTwoSphere = (rank, file) => {
    let tmp = gameState;
    tmp[rank][file] = "S"
    setGameState(tmp);
    setPlayerTwoSpherePlaced(true);
    console.log("adding player two sphere");
  }

  const selectCandidatePiece = (rank, file) => {
    setOriginRank(rank);
    setOriginFile(file);
    console.log("selecting candidate piece");
  };

  const movePiece = (destinationRank, destinationFile) => {
    let tmp = gameState;
    tmp[destinationRank][destinationFile] = gameState[originRank][originFile];
    tmp[originRank][originFile] = ""
    setGameState(tmp);
    setOriginRank(null);
    setOriginFile(null);
    console.log("moving piece");
  };

  return (
    <div className="board">
      <div className="content">
        <div id="row-7" className="board-row flex flex-row">
          <PrometheusSquare colour="white" piece={gameState[7][0]} onClick={() => {if(inProgress) makeMove(7, 0)}} />
          <PrometheusSquare colour="black" piece={gameState[7][1]} onClick={() => {if(inProgress) makeMove(7, 1)}} />
          <PrometheusSquare colour="white" piece={gameState[7][2]} onClick={() => {if(inProgress) makeMove(7, 2)}} />
          <PrometheusSquare colour="black" piece={gameState[7][3]} onClick={() => {if(inProgress) makeMove(7, 3)}} />
          <PrometheusSquare colour="white" piece={gameState[7][4]} onClick={() => {if(inProgress) makeMove(7, 4)}} />
          <PrometheusSquare colour="black" piece={gameState[7][5]} onClick={() => {if(inProgress) makeMove(7, 5)}} />
          <PrometheusSquare colour="white" piece={gameState[7][6]} onClick={() => {if(inProgress) makeMove(7, 6)}} />
          <PrometheusSquare colour="black" piece={gameState[7][7]} onClick={() => {if(inProgress) makeMove(7, 7)}} />
        </div>
        <div id="row-6" className="board-row flex flex-row">
          <PrometheusSquare colour="black" piece={gameState[6][0]} onClick={() => {if(inProgress) makeMove(6, 0)}} />
          <PrometheusSquare colour="white" piece={gameState[6][1]} onClick={() => {if(inProgress) makeMove(6, 1)}} />
          <PrometheusSquare colour="black" piece={gameState[6][2]} onClick={() => {if(inProgress) makeMove(6, 2)}} />
          <PrometheusSquare colour="white" piece={gameState[6][3]} onClick={() => {if(inProgress) makeMove(6, 3)}} />
          <PrometheusSquare colour="black" piece={gameState[6][4]} onClick={() => {if(inProgress) makeMove(6, 4)}} />
          <PrometheusSquare colour="white" piece={gameState[6][5]} onClick={() => {if(inProgress) makeMove(6, 5)}} />
          <PrometheusSquare colour="black" piece={gameState[6][6]} onClick={() => {if(inProgress) makeMove(6, 6)}} />
          <PrometheusSquare colour="white" piece={gameState[6][7]} onClick={() => {if(inProgress) makeMove(6, 7)}} />
        </div>
        <div id="row-5" className="board-row flex flex-row">
          <PrometheusSquare colour="white" piece={gameState[5][0]} onClick={() => {if(inProgress) makeMove(5, 0)}} />
          <PrometheusSquare colour="black" piece={gameState[5][1]} onClick={() => {if(inProgress) makeMove(5, 1)}} />
          <PrometheusSquare colour="white" piece={gameState[5][2]} onClick={() => {if(inProgress) makeMove(5, 2)}} />
          <PrometheusSquare colour="black" piece={gameState[5][3]} onClick={() => {if(inProgress) makeMove(5, 3)}} />
          <PrometheusSquare colour="white" piece={gameState[5][4]} onClick={() => {if(inProgress) makeMove(5, 4)}} />
          <PrometheusSquare colour="black" piece={gameState[5][5]} onClick={() => {if(inProgress) makeMove(5, 5)}} />
          <PrometheusSquare colour="white" piece={gameState[5][6]} onClick={() => {if(inProgress) makeMove(5, 6)}} />
          <PrometheusSquare colour="black" piece={gameState[5][7]} onClick={() => {if(inProgress) makeMove(5, 7)}} />
        </div>
        <div id="row-4" className="board-row flex flex-row">
          <PrometheusSquare colour="black" piece={gameState[4][0]} onClick={() => {if(inProgress) makeMove(4, 0)}} />
          <PrometheusSquare colour="white" piece={gameState[4][1]} onClick={() => {if(inProgress) makeMove(4, 1)}} />
          <PrometheusSquare colour="black" piece={gameState[4][2]} onClick={() => {if(inProgress) makeMove(4, 2)}} />
          <PrometheusSquare colour="white" piece={gameState[4][3]} onClick={() => {if(inProgress) makeMove(4, 3)}} />
          <PrometheusSquare colour="black" piece={gameState[4][4]} onClick={() => {if(inProgress) makeMove(4, 4)}} />
          <PrometheusSquare colour="white" piece={gameState[4][5]} onClick={() => {if(inProgress) makeMove(4, 5)}} />
          <PrometheusSquare colour="black" piece={gameState[4][6]} onClick={() => {if(inProgress) makeMove(4, 6)}} />
          <PrometheusSquare colour="white" piece={gameState[4][7]} onClick={() => {if(inProgress) makeMove(4, 7)}} />
        </div>
        <div id="row-3" className="board-row flex flex-row">
          <PrometheusSquare colour="white" piece={gameState[3][0]} onClick={() => {if(inProgress) makeMove(3, 0)}} />
          <PrometheusSquare colour="black" piece={gameState[3][1]} onClick={() => {if(inProgress) makeMove(3, 1)}} />
          <PrometheusSquare colour="white" piece={gameState[3][2]} onClick={() => {if(inProgress) makeMove(3, 2)}} />
          <PrometheusSquare colour="black" piece={gameState[3][3]} onClick={() => {if(inProgress) makeMove(3, 3)}} />
          <PrometheusSquare colour="white" piece={gameState[3][4]} onClick={() => {if(inProgress) makeMove(3, 4)}} />
          <PrometheusSquare colour="black" piece={gameState[3][5]} onClick={() => {if(inProgress) makeMove(3, 5)}} />
          <PrometheusSquare colour="white" piece={gameState[3][6]} onClick={() => {if(inProgress) makeMove(3, 6)}} />
          <PrometheusSquare colour="black" piece={gameState[3][7]} onClick={() => {if(inProgress) makeMove(3, 7)}} />
        </div>
        <div id="row-2" className="board-row flex flex-row">
          <PrometheusSquare colour="black" piece={gameState[2][0]} onClick={() => {if(inProgress) makeMove(2, 0)}} />
          <PrometheusSquare colour="white" piece={gameState[2][1]} onClick={() => {if(inProgress) makeMove(2, 1)}} />
          <PrometheusSquare colour="black" piece={gameState[2][2]} onClick={() => {if(inProgress) makeMove(2, 2)}} />
          <PrometheusSquare colour="white" piece={gameState[2][3]} onClick={() => {if(inProgress) makeMove(2, 3)}} />
          <PrometheusSquare colour="black" piece={gameState[2][4]} onClick={() => {if(inProgress) makeMove(2, 4)}} />
          <PrometheusSquare colour="white" piece={gameState[2][5]} onClick={() => {if(inProgress) makeMove(2, 5)}} />
          <PrometheusSquare colour="black" piece={gameState[2][6]} onClick={() => {if(inProgress) makeMove(2, 6)}} />
          <PrometheusSquare colour="white" piece={gameState[2][7]} onClick={() => {if(inProgress) makeMove(2, 7)}} />
        </div>
        <div id="row-1" className="board-row flex flex-row">
          <PrometheusSquare colour="white" piece={gameState[1][0]} onClick={() => {if(inProgress) makeMove(1, 0)}} />
          <PrometheusSquare colour="black" piece={gameState[1][1]} onClick={() => {if(inProgress) makeMove(1, 1)}} />
          <PrometheusSquare colour="white" piece={gameState[1][2]} onClick={() => {if(inProgress) makeMove(1, 2)}} />
          <PrometheusSquare colour="black" piece={gameState[1][3]} onClick={() => {if(inProgress) makeMove(1, 3)}} />
          <PrometheusSquare colour="white" piece={gameState[1][4]} onClick={() => {if(inProgress) makeMove(1, 4)}} />
          <PrometheusSquare colour="black" piece={gameState[1][5]} onClick={() => {if(inProgress) makeMove(1, 5)}} />
          <PrometheusSquare colour="white" piece={gameState[1][6]} onClick={() => {if(inProgress) makeMove(1, 6)}} />
          <PrometheusSquare colour="black" piece={gameState[1][7]} onClick={() => {if(inProgress) makeMove(1, 7)}} />
        </div>
        <div id="row-0" className="board-row flex flex-row">
          <PrometheusSquare colour="black" piece={gameState[0][0]} onClick={() => {if(inProgress) makeMove(0, 0)}} />
          <PrometheusSquare colour="white" piece={gameState[0][1]} onClick={() => {if(inProgress) makeMove(0, 1)}} />
          <PrometheusSquare colour="black" piece={gameState[0][2]} onClick={() => {if(inProgress) makeMove(0, 2)}} />
          <PrometheusSquare colour="white" piece={gameState[0][3]} onClick={() => {if(inProgress) makeMove(0, 3)}} />
          <PrometheusSquare colour="black" piece={gameState[0][4]} onClick={() => {if(inProgress) makeMove(0, 4)}} />
          <PrometheusSquare colour="white" piece={gameState[0][5]} onClick={() => {if(inProgress) makeMove(0, 5)}} />
          <PrometheusSquare colour="black" piece={gameState[0][6]} onClick={() => {if(inProgress) makeMove(0, 6)}} />
          <PrometheusSquare colour="white" piece={gameState[0][7]} onClick={() => {if(inProgress) makeMove(0, 7)}} />
        </div>
      </div>
    </div>
  );
};

export default PrometheusBoard;
