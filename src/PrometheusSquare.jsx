import React from 'react';
import Sphere from "./Pieces/Sphere";
import Pieces from "./Pieces";

const renderPiece = (piece) => {
  switch(piece) {
    case Pieces.WHITE_SPHERE || Pieces.BLACK_SPHERE:
      return (
        <Sphere colour="white" />
      );
    case Pieces.BLACK_SPHERE:
      return (
        <Sphere colour="black" />
      );
    default:
      return piece;
  }
}

const PrometheusSquare = ({colour, piece, onClick}) => {
  return (
    <div className={`square square-${colour} text-red-500`} onClick={onClick}>
      {renderPiece(piece, colour)}
    </div>
  )
}

export default PrometheusSquare;
