import Pieces from "./Pieces";

export const InitialGameStateWhite = [
  [
    Pieces.BLACK_CUBE,
    Pieces.BLACK_CUBE,
    Pieces.BLACK_CUBE,
    Pieces.BLACK_CUBE,
    Pieces.BLACK_CUBE,
    Pieces.BLACK_CUBE,
    Pieces.BLACK_CUBE,
    Pieces.BLACK_CUBE,
  ],
  [
    Pieces.BLACK_PYRAMID,
    Pieces.BLACK_PYRAMID,
    Pieces.BLACK_PYRAMID,
    Pieces.BLACK_PYRAMID,
    Pieces.BLACK_PYRAMID,
    Pieces.BLACK_PYRAMID,
    Pieces.BLACK_PYRAMID,
    Pieces.BLACK_PYRAMID,
  ],
  [
    Pieces.BLACK_TETRAHEDRON,
    Pieces.BLACK_TETRAHEDRON,
    Pieces.BLACK_TETRAHEDRON,
    Pieces.BLACK_TETRAHEDRON,
    Pieces.BLACK_TETRAHEDRON,
    Pieces.BLACK_TETRAHEDRON,
    Pieces.BLACK_TETRAHEDRON,
    Pieces.BLACK_TETRAHEDRON,
  ],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  [
    Pieces.WHITE_TETRAHEDRON,
    Pieces.WHITE_TETRAHEDRON,
    Pieces.WHITE_TETRAHEDRON,
    Pieces.WHITE_TETRAHEDRON,
    Pieces.WHITE_TETRAHEDRON,
    Pieces.WHITE_TETRAHEDRON,
    Pieces.WHITE_TETRAHEDRON,
    Pieces.WHITE_TETRAHEDRON,
  ],
  [
    Pieces.WHITE_PYRAMID,
    Pieces.WHITE_PYRAMID,
    Pieces.WHITE_PYRAMID,
    Pieces.WHITE_PYRAMID,
    Pieces.WHITE_PYRAMID,
    Pieces.WHITE_PYRAMID,
    Pieces.WHITE_PYRAMID,
    Pieces.WHITE_PYRAMID,
  ],
  [
    Pieces.WHITE_CUBE,
    Pieces.WHITE_CUBE,
    Pieces.WHITE_CUBE,
    Pieces.WHITE_CUBE,
    Pieces.WHITE_CUBE,
    Pieces.WHITE_CUBE,
    Pieces.WHITE_CUBE,
    Pieces.WHITE_CUBE,
  ],
];

export const InitialGameStateBlack = [
  [
    Pieces.WHITE_CUBE,
    Pieces.WHITE_CUBE,
    Pieces.WHITE_CUBE,
    Pieces.WHITE_CUBE,
    Pieces.WHITE_CUBE,
    Pieces.WHITE_CUBE,
    Pieces.WHITE_CUBE,
    Pieces.WHITE_CUBE,
  ],
  [
    Pieces.WHITE_PYRAMID,
    Pieces.WHITE_PYRAMID,
    Pieces.WHITE_PYRAMID,
    Pieces.WHITE_PYRAMID,
    Pieces.WHITE_PYRAMID,
    Pieces.WHITE_PYRAMID,
    Pieces.WHITE_PYRAMID,
    Pieces.WHITE_PYRAMID,
  ],
  [
    Pieces.WHITE_TETRAHEDRON,
    Pieces.WHITE_TETRAHEDRON,
    Pieces.WHITE_TETRAHEDRON,
    Pieces.WHITE_TETRAHEDRON,
    Pieces.WHITE_TETRAHEDRON,
    Pieces.WHITE_TETRAHEDRON,
    Pieces.WHITE_TETRAHEDRON,
    Pieces.WHITE_TETRAHEDRON,
  ],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  [
    Pieces.BLACK_TETRAHEDRON,
    Pieces.BLACK_TETRAHEDRON,
    Pieces.BLACK_TETRAHEDRON,
    Pieces.BLACK_TETRAHEDRON,
    Pieces.BLACK_TETRAHEDRON,
    Pieces.BLACK_TETRAHEDRON,
    Pieces.BLACK_TETRAHEDRON,
    Pieces.BLACK_TETRAHEDRON,
  ],
  [
    Pieces.BLACK_PYRAMID,
    Pieces.BLACK_PYRAMID,
    Pieces.BLACK_PYRAMID,
    Pieces.BLACK_PYRAMID,
    Pieces.BLACK_PYRAMID,
    Pieces.BLACK_PYRAMID,
    Pieces.BLACK_PYRAMID,
    Pieces.BLACK_PYRAMID,
  ],
  [
    Pieces.BLACK_CUBE,
    Pieces.BLACK_CUBE,
    Pieces.BLACK_CUBE,
    Pieces.BLACK_CUBE,
    Pieces.BLACK_CUBE,
    Pieces.BLACK_CUBE,
    Pieces.BLACK_CUBE,
    Pieces.BLACK_CUBE,
  ],
];

export const InitialRandomGameStateWhite = () => {
  let whiteTetrahedron = 8;
  let whitePyramid = 8;
  let whiteCube = 8;

  const gameState = Array.from({ length: 8 }, (_) => new Array(8).fill(""));

  let availablePieces = [
    [Pieces.WHITE_TETRAHEDRON, Pieces.BLACK_TETRAHEDRON],
    [Pieces.WHITE_PYRAMID, Pieces.BLACK_PYRAMID],
    [Pieces.WHITE_CUBE, Pieces.BLACK_CUBE],
  ];

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 8; y++) {
      const randomPiece =
        availablePieces[Math.floor(Math.random() * availablePieces.length)];
      gameState[7 - x][y] = randomPiece[0];
      gameState[x][y] = randomPiece[1];

      switch (randomPiece[0]) {
        case Pieces.WHITE_TETRAHEDRON:
          whiteTetrahedron--;
          if (whiteTetrahedron === 0) {
            availablePieces = availablePieces.filter(
              (piece) => piece.indexOf(Pieces.WHITE_TETRAHEDRON) === -1
            );
          }
          break;
        case Pieces.WHITE_PYRAMID:
          whitePyramid--;
          if (whitePyramid === 0) {
            availablePieces = availablePieces.filter(
              (piece) => piece.indexOf(Pieces.WHITE_PYRAMID) === -1
            );
          }
          break;
        case Pieces.WHITE_CUBE:
          whiteCube--;
          if (whiteCube === 0) {
            availablePieces = availablePieces.filter(
              (piece) => piece.indexOf(Pieces.WHITE_CUBE) === -1
            );
          }
          break;
        default:
          throw Error("Invalid piece");
      }
    }
  }

  return gameState;
};
