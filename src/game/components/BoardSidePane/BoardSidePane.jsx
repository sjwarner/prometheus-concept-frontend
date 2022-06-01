import React from "react";
import Pieces from "../../logic/Pieces";
import MaterialCounter from "../MaterialCounter/MaterialCounter";

const BoardSidePane = ({ gameState }) => {
  return (
    <div className="w-64 flex flex-row lg:flex-col justify-center items-center">
      <MaterialCounter gameState={gameState} piece={Pieces.WHITE_TETRAHEDRON} />
      <MaterialCounter gameState={gameState} piece={Pieces.WHITE_PYRAMID} />
      <MaterialCounter gameState={gameState} piece={Pieces.WHITE_CUBE} />
      <MaterialCounter gameState={gameState} piece={Pieces.BLACK_TETRAHEDRON} />
      <MaterialCounter gameState={gameState} piece={Pieces.BLACK_PYRAMID} />
      <MaterialCounter gameState={gameState} piece={Pieces.BLACK_CUBE} />
    </div>
  );
};

export default BoardSidePane;
