import React from 'react';
import Sphere from "../Pieces/Sphere";
import Pieces from "../../logic/Pieces";
import Tetrahedron from "../Pieces/Tetrahedron";
import Pyramid from "../Pieces/Pyramid";
import Cube from "../Pieces/Cube";

const renderPiece = (piece) => {
  switch(piece) {
    case Pieces.WHITE_SPHERE:
      return (
        <Sphere colour="white" />
      );
    case Pieces.BLACK_SPHERE:
      return (
        <Sphere colour="black" />
      );
    case Pieces.WHITE_TETRAHEDRON:
      return (
        <Tetrahedron colour="white" />
      );
    case Pieces.BLACK_TETRAHEDRON:
      return (
        <Tetrahedron colour="black" />
      );
    case Pieces.WHITE_PYRAMID:
      return (
        <Pyramid colour="white" />
      );
    case Pieces.BLACK_PYRAMID:
      return (
        <Pyramid colour="black" />
      );
    case Pieces.WHITE_CUBE:
      return (
        <Cube colour="white" />
      );
    case Pieces.BLACK_CUBE:
      return (
        <Cube colour="black" />
      );
    default:
      return piece;
  }
}

const PrometheusSquare = ({colour, piece, selected, valid, onClick}) => {
  return (
    <div className={`square square-${colour} ${selected ? "square-selected" : ""} ${valid ? "square-valid" : ""}`} onClick={onClick}>
      {renderPiece(piece, colour)}
    </div>
  )
}

export default PrometheusSquare;
