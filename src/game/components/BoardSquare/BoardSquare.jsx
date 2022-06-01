import React from "react";
import { renderPiece } from "../../logic/utils";

const BoardSquare = ({ colour, piece, selected, lastMove, valid, onClick }) => {
  return (
    <div
      className={`square square-${colour} ${
        selected ? "square-selected" : ""
      } ${valid ? "square-valid" : ""} ${
        lastMove && !valid ? "square-previous" : ""
      }`}
      onClick={onClick}
    >
      {renderPiece(piece, colour)}
    </div>
  );
};

export default BoardSquare;
