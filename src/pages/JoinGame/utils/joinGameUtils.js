import axios from "axios";

export const attemptJoinParty = (
  baseUrl,
  socket,
  username,
  roomCode,
  setErrorMessage,
  setHasError,
  setIsLoading,
  setIsInRoom,
  setPlayers,
  setInitialGameState,
  setIsGameStarted
) => {
  if (!username) {
    setErrorMessage("Name must be set");
    setHasError(true);
    return;
  }

  if (!roomCode) {
    setErrorMessage("Room code must be specified");
    setHasError(true);
    return;
  }

  setIsLoading(true);

  axios
    .get(`${baseUrl}/exists/${roomCode}`)
    .then(function (res) {
      if (res.data.exists) {
        setErrorMessage("");
        joinParty(
          socket,
          username,
          setIsLoading,
          setIsInRoom,
          setErrorMessage,
          setHasError,
          setPlayers,
          setInitialGameState,
          setIsGameStarted
        );
      } else {
        setIsLoading(false);
        setErrorMessage("Invalid Party Code");
        setHasError(true);
      }
    })
    .catch(function (err) {
      setIsLoading(false);
      setErrorMessage("Server error: " + err);
      setHasError(true);
    });
};

export const reportReady = (socket, setIsReady) => {
  socket.emit("setReady", true);
  socket.on("readyConfirm", () => {
    setIsReady(true);
  });
};

const joinParty = (
  socket,
  username,
  setIsLoading,
  setIsInRoom,
  setErrorMessage,
  setHasError,
  setPlayers,
  setInitialGameState,
  setIsGameStarted
) => {
  socket.emit("setName", username);

  socket.on("joinSuccess", function () {
    setIsLoading(false);
    setIsInRoom(true);
  });

  socket.on("joinFailed", function (err) {
    setErrorMessage(err);
    setHasError(true);
    setIsLoading(false);

    socket.disconnect();
  });

  socket.on("partyUpdate", (players) => {
    setPlayers(players);
  });

  socket.on("updateClientPlayerOrder", (players) => {
    setPlayers(players);
  });

  socket.on("startGame", () => {
    setIsGameStarted(true);
  });

  socket.on("startRandomGame", (gameState) => {
    setInitialGameState(gameState);
    setIsGameStarted(true);
  });
};
