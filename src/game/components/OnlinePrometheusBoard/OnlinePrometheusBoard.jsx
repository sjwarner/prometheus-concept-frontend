import React, { useCallback, useEffect, useState } from "react";
import PrometheusSquare from "../PrometheusSquare/PrometheusSquare";
import OnlineBoardCaption from "../OnlineBoardCaption/OnlineBoardCaption";

import {
  InitialGameStateWhite,
  InitialGameStateBlack,
} from "../../logic/InitialGameState";
import Pieces from "../../logic/Pieces";
import Players from "../../logic/Players";

import { calculateValidMoves, isArrayInArray } from "../../logic/utils";

const OnlinePrometheusBoard = ({
  socket,
  isGameStarted,
  initialPlayerNumber,
  players,
  username,
  setIsDisconnected,
  setDisconnectedMessage,
}) => {
  const [inProgress, setInProgress] = useState(isGameStarted);
  const [isPlayerTurn, setIsPlayerTurn] = useState(null);
  const [playerNumber, setPlayerNumber] = useState(initialPlayerNumber);

  const [isSpherePlaced, setIsSpherePlaced] = useState(false);

  const [povInitialGameState, setPovInitialGameState] = useState(
    playerNumber === Players.WHITE
      ? InitialGameStateWhite
      : InitialGameStateBlack
  );

  const [gameState, setGameState] = useState(
    // Stringify hack to deep clone InitialGameState - avoids mutation.
    JSON.parse(JSON.stringify(povInitialGameState))
  );
  const [lastMove, setLastMove] = useState(
    Array.from({ length: 8 }, (_) => new Array(8).fill(false))
  );
  const [winner, setWinner] = useState(null);
  const [hasRequestedRematch, setHasRequestedRematch] = useState(false);
  const [hasOpponentRequestedRematch, setHasOpponentRequestedRematch] =
    useState(false);

  const resetGame = (isStartingPlayer) => {
    setInProgress(true);
    setWinner(null);
    setGameState(
      isStartingPlayer ? InitialGameStateWhite : InitialGameStateBlack
    );
    setLastMove(Array.from({ length: 8 }, (_) => new Array(8).fill(false)));
    setIsSpherePlaced(false);
  };

  const [originRank, setOriginRank] = useState(null);
  const [originFile, setOriginFile] = useState(null);
  const [firstTurn, setFirstTurn] = useState(true);
  const [validMoves, setValidMoves] = useState([]);

  useEffect(() => {
    setFirstTurn(true);
  }, [inProgress]);

  const joinParty = useCallback(() => {
    socket.on("updatePlayerTurn", (newPlayerTurnUsername) => {
      setIsPlayerTurn(newPlayerTurnUsername === username);
    });

    socket.on("updateGameState", (newGameState) => {
      setLastMove(
        gameState.map((row, x) =>
          row.map((square, y) => square !== newGameState[x][y])
        )
      );
      setGameState(newGameState);
    });

    socket.on("updatePlayerWon", (winningUsername) => {
      setWinner(winningUsername);
      setInProgress(false);
    });

    socket.on("opponentRequestedRematch", () => {
      setHasOpponentRequestedRematch(true);
    });

    socket.on("resetGame", (startingPlayer) => {
      setHasRequestedRematch(false);
      setHasOpponentRequestedRematch(false);

      const isStartingPlayer = players[startingPlayer].name === username;
      setPlayerNumber(isStartingPlayer ? Players.WHITE : Players.BLACK);
      setPovInitialGameState(
        isStartingPlayer ? InitialGameStateWhite : InitialGameStateBlack
      );
      setIsPlayerTurn(isStartingPlayer);

      resetGame(isStartingPlayer);
    });

    socket.on("connect", () => {
      console.log("You've connected to the server");
      setIsDisconnected(false);
    });

    socket.on("disconnect", () => {
      console.log("You've lost connection with the server");
      setIsDisconnected(true);
      setDisconnectedMessage("Disconnected from server.");
      socket.close();
    });

    socket.on("playerDisconnected", (disconnectedReason) => {
      console.log("Opponent left game");
      setIsDisconnected(true);
      setDisconnectedMessage(disconnectedReason);
    });
  }, [
    gameState,
    players,
    setDisconnectedMessage,
    setIsDisconnected,
    socket,
    username,
  ]);

  useEffect(() => {
    if (socket) {
      joinParty();
    }
  }, [socket, joinParty]);

  const makeMove = (rank, file) =>
    !isSpherePlaced
      ? addSphere(rank, file)
      : originRank === null && originFile === null
      ? selectCandidatePiece(rank, file)
      : originRank === rank && originFile === file
      ? clearCandidatePiece()
      : movePiece(rank, file);

  const addSphere = (rank, file) => {
    let selectedSquare = gameState[rank][file];

    // Use correct function for either white or black
    const selectedSquareCaseTransformed =
      playerNumber === Players.WHITE
        ? selectedSquare.toUpperCase()
        : selectedSquare.toLowerCase();

    if (selectedSquare && selectedSquare === selectedSquareCaseTransformed) {
      // Use a deep copy of gameState to work out previous move highlighting
      let oldGameState = JSON.parse(JSON.stringify(gameState));
      let tmp = gameState;
      tmp[rank][file] =
        playerNumber === Players.WHITE
          ? Pieces.WHITE_SPHERE
          : Pieces.BLACK_SPHERE;
      setLastMove(
        oldGameState.map((row, x) =>
          row.map((square, y) => square !== tmp[x][y])
        )
      );
      setGameState(tmp);
      setIsSpherePlaced(true);

      let reversedGameState = JSON.parse(JSON.stringify(gameState));
      reversedGameState.map((row) => row.reverse());
      reversedGameState.reverse();
      socket.emit("playerMovedPiece", reversedGameState);
    }
  };

  const selectCandidatePiece = (rank, file) => {
    let candidatePiece = gameState[rank][file];
    if (
      (playerNumber === Players.WHITE &&
        candidatePiece &&
        candidatePiece === candidatePiece.toUpperCase()) ||
      (playerNumber === Players.BLACK &&
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
    console.log("moved piece");
    if (isArrayInArray(validMoves, [destinationRank, destinationFile])) {
      // Use a deep copy of gameState to work out previous move highlighting
      let oldGameState = JSON.parse(JSON.stringify(gameState));
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
      setLastMove(
        oldGameState.map((row, x) =>
          row.map((square, y) => square !== tmp[x][y])
        )
      );
      setGameState(tmp);
      setOriginRank(null);
      setOriginFile(null);
      setValidMoves([]);

      if (winningMove) {
        let reversedGameState = JSON.parse(JSON.stringify(gameState));
        reversedGameState.map((row) => row.reverse());
        reversedGameState.reverse();

        socket.emit("playerWon", reversedGameState);
      } else {
        let reversedGameState = JSON.parse(JSON.stringify(gameState));
        reversedGameState.map((row) => row.reverse());
        reversedGameState.reverse();

        socket.emit("playerMovedPiece", reversedGameState);
      }
    }
  };

  const requestRematch = () => {
    setHasRequestedRematch(true);
    socket.emit("requestRematch", username);
  };

  return (
    <div className="board flex flex-row">
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
                        lastMove={lastMove[x][y]}
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
        <OnlineBoardCaption
          inProgress={inProgress}
          isPlayerTurn={isPlayerTurn}
          isSpherePlaced={isSpherePlaced}
          winner={winner}
          hasRequestedRematch={hasRequestedRematch}
          hasOpponentRequestedRematch={hasOpponentRequestedRematch}
          requestRematch={requestRematch}
        />
      </div>
    </div>
  );
};

export default OnlinePrometheusBoard;
