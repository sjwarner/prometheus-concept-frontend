import axios from "axios";

export const createParty = (
  baseUrl,
  username,
  setErrorMessage,
  setHasError,
  setIsLoading,
  setRoomCode
) => {
  if (!username) {
    setErrorMessage("Username must be set");
    setHasError(true);
    return;
  }

  setHasError(false);
  setIsLoading(true);

  axios
    .get(`${baseUrl}/createNamespace`)
    .then((res) => {
      setIsLoading(false);
      setRoomCode(res.data.namespace);
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
      setErrorMessage("Error creating room, server is unreachable");
      setHasError(true);
    });
};

export const startGame = (
  socket,
  players,
  setIsGameStarted,
  setInitialGameState,
  gameMode
) => {
  socket.emit("startGameSignal", players, gameMode);

  socket.on("startGame", () => {
    setIsGameStarted(true);
  });

  socket.on("startRandomGame", (gameState) => {
    setInitialGameState(gameState);
    setIsGameStarted(true);
  });
};
