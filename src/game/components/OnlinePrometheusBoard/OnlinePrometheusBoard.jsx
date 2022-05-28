import React, {useEffect, useState} from "react";
import PrometheusSquare from "../PrometheusSquare/PrometheusSquare";
import Pieces from "../../logic/Pieces";
import Players from "../../logic/Players";
import { calculateValidMoves, isArrayInArray } from "../../logic/utils";
import InitialGameState from "../../logic/InitialGameState";

const OnlinePrometheusBoard = ({ socket, isGameStarted, playerNumber, players, username }) => {
  const [inProgress, setInProgress] = useState(isGameStarted);
  const [turn, setTurn] = useState(Players.PLAYER_ONE);
  const [isPlayerTurn, setIsPlayerTurn] = useState(turn === playerNumber);

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

  useEffect(() => {
    setIsPlayerTurn(turn === playerNumber);
  }, [turn, playerNumber]);

  const makeMove = (rank, file) => {
    !spherePlaced
      ? addSphere(rank, file)
      : originRank === null && originFile === null
      ? selectCandidatePiece(rank, file)
      : originRank === rank && originFile === file
      ? clearCandidatePiece()
      : movePiece(rank, file);
  };

  socket.on("updatePlayerTurn", (newPlayerTurnUsername) => {
    setIsPlayerTurn(newPlayerTurnUsername === username);
    console.log('player turn updated to ', newPlayerTurnUsername)
  })

  const addSphere = (rank, file) => {
    let selectedSquare = gameState[rank][file];

    // Use correct function for either white or black
    const selectedSquareCaseTransformed = playerNumber === "player_one" ? selectedSquare.toUpperCase() : selectedSquare.toLowerCase();

    if (selectedSquare && selectedSquare === selectedSquareCaseTransformed) {
      let tmp = gameState;
      tmp[rank][file] = Pieces.WHITE_SPHERE;
      setGameState(tmp);
      setSpherePlaced(true);
    }

    socket.emit("playerSetSphere", playerNumber, gameState);
    console.log(socket);
    console.log("emmitted player set sphere")
  };

  const selectCandidatePiece = (rank, file) => {
    let candidatePiece = gameState[rank][file];
    if (
      (turn === Players.PLAYER_ONE &&
        candidatePiece &&
        candidatePiece === candidatePiece.toUpperCase()) ||
      (turn === Players.PLAYER_TWO &&
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
      if (playerOneFirstTurn && turn === Players.PLAYER_ONE) {
        setPlayerOneFirstTurn(false);
      }
      if (playerTwoFirstTurn && turn === Players.PLAYER_TWO) {
        setPlayerTwoFirstTurn(false);
      }
      tmp[destinationRank][destinationFile] = gameState[originRank][originFile];
      tmp[originRank][originFile] = "";
      setGameState(tmp);
      setOriginRank(null);
      setOriginFile(null);
      setValidMoves([]);
      setTurn(
        turn === Players.PLAYER_ONE ? Players.PLAYER_TWO : Players.PLAYER_ONE
      );
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
