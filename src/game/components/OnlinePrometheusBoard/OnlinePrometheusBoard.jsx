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
  players,
  username,
}) => {
  const [inProgress, setInProgress] = useState(isGameStarted);
  const [isPlayerTurn, setIsPlayerTurn] = useState(playerNumber === Players.PLAYER_ONE);

  const [spherePlaced, setSpherePlaced] = useState(false);
  // const [playerTwoSpherePlaced, setPlayerTwoSpherePlaced] = useState(false);
  // Stringify hack to deep clone InitialGameState - avoids mutation.
  // TODO: Use lodash here instead?
  const [gameState, setGameState] = useState(
    JSON.parse(JSON.stringify(InitialGameState))
  );
  // const [winner, setWinner] = useState(null);

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
  const [playerOneFirstTurn, setPlayerOneFirstTurn] = useState(true);
  const [playerTwoFirstTurn, setPlayerTwoFirstTurn] = useState(true);
  const [validMoves, setValidMoves] = useState([]);

  useEffect(() => {
    setPlayerOneFirstTurn(true);
    setPlayerTwoFirstTurn(true);
  }, [inProgress]);

  const makeMove = (rank, file) =>
      !spherePlaced
          ? addSphere(rank, file)
          : originRank === null && originFile === null
              ? selectCandidatePiece(rank, file)
              : originRank === rank && originFile === file
                  ? clearCandidatePiece()
                  : movePiece(rank, file)

  socket.on("updatePlayerTurn", newPlayerTurnUsername => {
    setIsPlayerTurn(newPlayerTurnUsername === username);
  });

  socket.on("updateGameState", newGameState => {
    setGameState(newGameState);
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
      tmp[rank][file] = playerNumber === Players.PLAYER_ONE ? Pieces.WHITE_SPHERE : Pieces.BLACK_SPHERE;
      setGameState(tmp);
      setSpherePlaced(true);
    }

    socket.emit("playerSetSphere", playerNumber, gameState);
    console.log(socket);
    console.log("emmitted player set sphere");
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
      calculateValidMoves(
        rank,
        file,
        gameState,
        setValidMoves,
        playerOneFirstTurn,
        playerTwoFirstTurn
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
        // setWinner(turn);
        setInProgress(false);
      }
      if (playerOneFirstTurn && playerNumber === Players.PLAYER_ONE) {
        setPlayerOneFirstTurn(false);
      }
      if (playerTwoFirstTurn && playerNumber === Players.PLAYER_TWO) {
        setPlayerTwoFirstTurn(false);
      }
      tmp[destinationRank][destinationFile] = gameState[originRank][originFile];
      tmp[originRank][originFile] = "";
      setGameState(tmp);
      setOriginRank(null);
      setOriginFile(null);
      setValidMoves([]);
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
      </div>
    </div>
  );
};

export default OnlinePrometheusBoard;
