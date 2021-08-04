import Pieces from "./Pieces";

export const calculateValidMoves = (rank, file, gameState, setValidMoves) => {
  const piece = gameState[rank][file];
  const movement = movementSpeed(piece);
  let validMoves = []

  // Do some smarts here with movement and gameState
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      // Skip your own square and own pieces
      if ((x === rank && y === file)
       || (isUpper(piece) && isUpper(gameState[x][y]))
       || (isLower(piece) && isLower(gameState[x][y]))) {
        continue;
      }

      // TODO: Work out valid squares to land on
      if (Math.abs(x - rank) + Math.abs(y - file) <= movement) {
        validMoves.push([x,y])
      }
    }
  }

  setValidMoves(validMoves);
}

export const isArrayInArray = (arr, item) => {
  const item_as_string = JSON.stringify(item);

  return arr.some(function (ele) {
    return JSON.stringify(ele) === item_as_string;
  });
}

const movementSpeed = (piece) => {
  switch(piece) {
    case Pieces.WHITE_SPHERE || Pieces.BLACK_SPHERE:
      return 0;
    case Pieces.WHITE_TETRAHEDRON || Pieces.BLACK_TETRAHEDRON:
      return 4;
    case Pieces.WHITE_PYRAMID || Pieces.BLACK_PYRAMID:
      return 5;
    case Pieces.WHITE_CUBE || Pieces.BLACK_CUBE:
      return 8;
    default:
      return 0;
  }
}

const isUpper = (str) => {
  return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}

const isLower = (str) => {
  return !isUpper(str)
}
