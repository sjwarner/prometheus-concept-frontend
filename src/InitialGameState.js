import Pieces from "./Pieces";

const InitialGameState = [
  [Pieces.BLACK_CUBE, Pieces.BLACK_CUBE, Pieces.BLACK_CUBE, Pieces.BLACK_CUBE, Pieces.BLACK_CUBE, Pieces.BLACK_CUBE, Pieces.BLACK_CUBE, Pieces.BLACK_CUBE],
  [Pieces.BLACK_PYRAMID, Pieces.BLACK_PYRAMID, Pieces.BLACK_PYRAMID, Pieces.BLACK_PYRAMID, Pieces.BLACK_PYRAMID, Pieces.BLACK_PYRAMID, Pieces.BLACK_PYRAMID, Pieces.BLACK_PYRAMID],
  [Pieces.BLACK_TETRAHEDRON, Pieces.BLACK_TETRAHEDRON, Pieces.BLACK_TETRAHEDRON, Pieces.BLACK_TETRAHEDRON, Pieces.BLACK_TETRAHEDRON, Pieces.BLACK_TETRAHEDRON, Pieces.BLACK_TETRAHEDRON, Pieces.BLACK_TETRAHEDRON],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  [Pieces.WHITE_TETRAHEDRON, Pieces.WHITE_TETRAHEDRON, Pieces.WHITE_TETRAHEDRON, Pieces.WHITE_TETRAHEDRON, Pieces.WHITE_TETRAHEDRON, Pieces.WHITE_TETRAHEDRON, Pieces.WHITE_TETRAHEDRON, Pieces.WHITE_TETRAHEDRON],
  [Pieces.WHITE_PYRAMID, Pieces.WHITE_PYRAMID, Pieces.WHITE_PYRAMID, Pieces.WHITE_PYRAMID, Pieces.WHITE_PYRAMID, Pieces.WHITE_PYRAMID, Pieces.WHITE_PYRAMID, Pieces.WHITE_PYRAMID],
  [Pieces.WHITE_CUBE, Pieces.WHITE_CUBE, Pieces.WHITE_CUBE, Pieces.WHITE_CUBE, Pieces.WHITE_CUBE, Pieces.WHITE_CUBE, Pieces.WHITE_CUBE, Pieces.WHITE_CUBE],
];

export default InitialGameState;