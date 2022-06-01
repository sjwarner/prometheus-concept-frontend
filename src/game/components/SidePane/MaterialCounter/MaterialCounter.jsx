import React from "react";
import { renderPiece } from "../../../logic/utils";

const MaterialCounter = ({ gameState, piece }) => {
  return (
    <div className="flex flex-row">
      <div className="h-10 w-10 mt-auto mb-auto">{renderPiece(piece)}</div>
      <span className="mt-auto mb-auto">
        :
        {gameState?.reduce(
          (currentCount, row) =>
            currentCount + row.filter((square) => square === piece).length,
          0
        )}
      </span>
    </div>
  );
};

export default MaterialCounter;
