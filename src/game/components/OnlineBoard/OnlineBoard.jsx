import React, { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";

import BoardSquares from "../BoardSquares/BoardSquares";
import OnlineBoardCaption from "../OnlineBoardCaption/OnlineBoardCaption";
import BoardSidePane from "../SidePane/BoardSidePane/BoardSidePane";

import moveSfx from "../../../sounds/move.wav";

import {
  InitialGameStateWhite,
  InitialGameStateBlack,
} from "../../logic/InitialGameState";
import Pieces from "../../logic/Pieces";
import Players from "../../logic/Players";
import GameModes from "../../logic/GameModes";

import { calculateValidMoves, isArrayInArray } from "../../logic/utils";

const OnlineBoard = ({
  socket,
  isGameStarted,
  initialPlayerNumber,
  players,
  username,
  setIsDisconnected,
  setDisconnectedMessage,
  gameMode,
  initialGameState,
}) => {
  const [inProgress, setInProgress] = useState(isGameStarted);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [playerNumber, setPlayerNumber] = useState(initialPlayerNumber);
  const [playMoveSound] = useSound(moveSfx);

  const [isSpherePlaced, setIsSpherePlaced] = useState(false);

  const [gameState, setGameState] = useState(
    // Stringify hack to deep clone InitialGameState - avoids mutation.
    JSON.parse(
      JSON.stringify(
        gameMode === GameModes.ORIGINAL
          ? playerNumber === Players.WHITE
            ? InitialGameStateWhite
            : InitialGameStateBlack
          : playerNumber === Players.WHITE
          ? initialGameState
          : initialGameState.map((row) => row.reverse()).reverse()
      )
    )
  );
  const [lastMove, setLastMove] = useState(
    Array.from({ length: 8 }, (_) => new Array(8).fill(false))
  );

  const [hasOfferedDraw, setHasOfferedDraw] = useState(false);
  const [hasOpponentOfferedDraw, setHasOpponentOfferedDraw] = useState(false);
  const [isGameDrawn, setIsGameDrawn] = useState(false);
  const [winner, setWinner] = useState(null);

  const [hasResigned, setHasResigned] = useState(false);
  const [hasOpponentResigned, setHasOpponentResigned] = useState(false);

  const [hasRequestedRematch, setHasRequestedRematch] = useState(false);
  const [hasOpponentRequestedRematch, setHasOpponentRequestedRematch] =
    useState(false);

  const resetGame = () => {
    setIsGameDrawn(false);
    setHasResigned(false);
    setHasOpponentResigned(false);
    setInProgress(true);
    setWinner(null);
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
      playMoveSound();

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

    socket.on("opponentOfferedDraw", () => {
      setHasOpponentOfferedDraw(true);
    });

    socket.on("opponentWithdrewDrawOffer", () => {
      setHasOpponentOfferedDraw(false);
    });

    socket.on("opponentAcceptedDraw", () => {
      setHasOfferedDraw(false);
      setIsGameDrawn(true);
      setInProgress(false);
    });

    socket.on("opponentDeclinedDraw", () => {
      setHasOfferedDraw(false);
    });

    socket.on("opponentResigned", () => {
      setHasOpponentResigned(true);
      setInProgress(false);
    });

    socket.on("opponentRequestedRematch", () => {
      setHasOpponentRequestedRematch(true);
    });

    socket.on("resetGame", (startingPlayer, gameState) => {
      setHasRequestedRematch(false);
      setHasOpponentRequestedRematch(false);

      const isStartingPlayer = players[startingPlayer].name === username;
      setPlayerNumber(isStartingPlayer ? Players.WHITE : Players.BLACK);

      setGameState(
        gameMode === GameModes.ORIGINAL
          ? isStartingPlayer
            ? JSON.parse(JSON.stringify(InitialGameStateWhite))
            : JSON.parse(JSON.stringify(InitialGameStateBlack))
          : isStartingPlayer
          ? gameState
          : JSON.parse(JSON.stringify(gameState))
              .map((row) => row.reverse())
              .reverse()
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
    gameMode,
    gameState,
    playMoveSound,
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

  const makeMove = (rank, file) => {
    playMoveSound();
    !isSpherePlaced
      ? addSphere(rank, file)
      : originRank === null && originFile === null
      ? selectCandidatePiece(rank, file)
      : originRank === rank && originFile === file
      ? clearCandidatePiece()
      : movePiece(rank, file);
  };

  const addSphere = (rank, file) => {
    let selectedSquare = gameState[rank][file];

    // Use correct function for either white or black
    const selectedSquareCaseTransformed =
      playerNumber === Players.WHITE
        ? selectedSquare.toUpperCase()
        : selectedSquare.toLowerCase();

    if (selectedSquare && selectedSquare === selectedSquareCaseTransformed) {
      if (hasOfferedDraw) {
        setHasOfferedDraw(false);
        socket.emit("playerWithdrewDrawOffer", socket.id);
      }

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
      if (hasOfferedDraw) {
        setHasOfferedDraw(false);
        socket.emit("playerWithdrewDrawOffer", socket.id);
      }
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
      // Use a deep copy of gameState to work out previous move highlighting
      let oldGameState = JSON.parse(JSON.stringify(gameState));
      let tmp = gameState;
      let winningMove = false;

      // If the move takes a sphere, the game is won
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

      // If there are no more movable pieces for either side, the game is won
      if (
        gameState.reduce(
          (currentCount, row) =>
            currentCount +
            row.filter(
              (square) =>
                square === square.toUpperCase() &&
                ["S", ""].indexOf(square) === -1
            ).length,
          0
        ) === 0 ||
        gameState.reduce(
          (currentCount, row) =>
            currentCount +
            row.filter(
              (square) =>
                square === square.toLowerCase() &&
                ["s", ""].indexOf(square) === -1
            ).length,
          0
        ) === 0
      ) {
        winningMove = true;
      }

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
    socket.emit("requestRematch", username, gameMode);
  };

  return (
    <>
      <div className="board flex flex-row m-auto">
        <div className="content">
          <BoardSquares
            gameState={gameState}
            originRank={originRank}
            originFile={originFile}
            lastMove={lastMove}
            validMoves={validMoves}
            inProgress={inProgress}
            isPlayerTurn={isPlayerTurn}
            makeMove={makeMove}
          />
          <OnlineBoardCaption
            inProgress={inProgress}
            isPlayerTurn={isPlayerTurn}
            isSpherePlaced={isSpherePlaced}
            isGameDrawn={isGameDrawn}
            winner={winner}
            hasResigned={hasResigned}
            hasOpponentResigned={hasOpponentResigned}
            hasRequestedRematch={hasRequestedRematch}
            hasOpponentRequestedRematch={hasOpponentRequestedRematch}
            requestRematch={requestRematch}
          />
        </div>
      </div>
      <BoardSidePane
        gameState={gameState}
        socket={socket}
        hasResigned={hasResigned}
        setHasResigned={setHasResigned}
        inProgress={inProgress}
        setInProgress={setInProgress}
        hasOfferedDraw={hasOfferedDraw}
        setHasOfferedDraw={setHasOfferedDraw}
        hasOpponentOfferedDraw={hasOpponentOfferedDraw}
        setHasOpponentOfferedDraw={setHasOpponentOfferedDraw}
        setIsGameDrawn={setIsGameDrawn}
      />
    </>
  );
};

export default OnlineBoard;
