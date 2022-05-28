import Pieces from "./Pieces";

export const calculateValidMoves = (
  rank,
  file,
  gameState,
  setValidMoves,
  firstTurn
) => {
  const piece = gameState[rank][file];
  const movement = movementSpeed(piece);
  let validMoves = [];

  addValidMoves(
    rank,
    file - 1,
    movement - 1,
    validMoves,
    piece,
    gameState,
    firstTurn
  ); // up
  addValidMoves(
    rank + 1,
    file,
    movement - 1,
    validMoves,
    piece,
    gameState,
    firstTurn
  ); // right
  addValidMoves(
    rank,
    file + 1,
    movement - 1,
    validMoves,
    piece,
    gameState,
    firstTurn
  ); // down
  addValidMoves(
    rank - 1,
    file,
    movement - 1,
    validMoves,
    piece,
    gameState,
    firstTurn
  ); // left

  setValidMoves(validMoves);
};

const addValidMoves = (
  x,
  y,
  movement,
  validMoves,
  piece,
  gameState,
  firstTurn
) => {
  if (7 < x || x < 0 || 7 < y || y < 0) return;

  if (gameState[x][y] && firstTurn) return; // Can't take a piece on your first turn
  if (gameState[x][y] && isPlayerPiece(gameState[x][y], piece)) return; // Abort if hits own piece
  if (gameState[x][y]) {
    validMoves.push([x, y]);
    return;
  } // Mark valid and abort if hit opponent piece
  if (movement === 0) {
    validMoves.push([x, y]);
    return;
  } // Final move terminates

  validMoves.push([x, y]);

  addValidMoves(
    x,
    y - 1,
    movement - 1,
    validMoves,
    piece,
    gameState,
    firstTurn
  ); // up
  addValidMoves(
    x + 1,
    y,
    movement - 1,
    validMoves,
    piece,
    gameState,
    firstTurn
  ); // right
  addValidMoves(
    x,
    y + 1,
    movement - 1,
    validMoves,
    piece,
    gameState,
    firstTurn
  ); // down
  addValidMoves(
    x - 1,
    y,
    movement - 1,
    validMoves,
    piece,
    gameState,
    firstTurn
  ); // left
};

export const isArrayInArray = (arr, item) => {
  const item_as_string = JSON.stringify(item);

  return arr.some(function (ele) {
    return JSON.stringify(ele) === item_as_string;
  });
};

const movementSpeed = (piece) => {
  switch (piece) {
    case Pieces.WHITE_SPHERE:
    case Pieces.BLACK_SPHERE:
      return 0;
    case Pieces.WHITE_TETRAHEDRON:
    case Pieces.BLACK_TETRAHEDRON:
      return 4;
    case Pieces.WHITE_PYRAMID:
    case Pieces.BLACK_PYRAMID:
      return 5;
    case Pieces.WHITE_CUBE:
    case Pieces.BLACK_CUBE:
      return 8;
    default:
      return 0;
  }
};

const isUpper = (str) => {
  return !/[a-z]/.test(str) && /[A-Z]/.test(str);
};

const isPlayerPiece = (str1, str2) => {
  return isUpper(str1) === isUpper(str2);
};
