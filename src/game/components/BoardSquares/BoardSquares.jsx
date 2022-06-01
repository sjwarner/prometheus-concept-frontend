import React from "react";
import PrometheusSquare from "../PrometheusSquare/PrometheusSquare";
import { isArrayInArray } from "../../logic/utils";

const BoardSquares = ({
  gameState,
  originRank,
  originFile,
  lastMove,
  validMoves,
  inProgress,
  isPlayerTurn,
  makeMove,
}) => {
  return Array(8)
    .fill(1)
    .map((el, x) => {
      return (
        <div id={`rank-${x}`} className="board-row flex flex-row" key={x}>
          {Array(8)
            .fill(1)
            .map((el, y) => {
              return (
                <PrometheusSquare
                  colour={(x + y) % 2 === 0 ? "black" : "white"}
                  piece={gameState[x][y]}
                  selected={x === originRank && y === originFile}
                  lastMove={lastMove[x][y]}
                  valid={isArrayInArray(validMoves, [x, y])}
                  onClick={() => {
                    if (inProgress && isPlayerTurn) makeMove(x, y);
                  }}
                  key={y}
                />
              );
            })}
        </div>
      );
    });
};

export default BoardSquares;
