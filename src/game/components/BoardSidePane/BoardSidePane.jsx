import React from "react";
import Pieces from "../../logic/Pieces";
import MaterialCounter from "../MaterialCounter/MaterialCounter";

const BoardSidePane = ({
  gameState,
  socket,
  hasResigned,
  setHasResigned,
  inProgress,
  setInProgress,
}) => {
  return (
    <div className="w-64 flex flex-row lg:flex-col justify-center items-center">
      <MaterialCounter gameState={gameState} piece={Pieces.WHITE_TETRAHEDRON} />
      <MaterialCounter gameState={gameState} piece={Pieces.WHITE_PYRAMID} />
      <MaterialCounter gameState={gameState} piece={Pieces.WHITE_CUBE} />
      <MaterialCounter gameState={gameState} piece={Pieces.BLACK_TETRAHEDRON} />
      <MaterialCounter gameState={gameState} piece={Pieces.BLACK_PYRAMID} />
      <MaterialCounter gameState={gameState} piece={Pieces.BLACK_CUBE} />
      {socket && (
        <button
          className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow disabled:cursor-not-allowed disabled:opacity-50"
          disabled={hasResigned || !inProgress}
          onClick={() => {
            setHasResigned(true);
            setInProgress(false);
            socket.emit("playerResigned", socket.id);
          }}
        >
          Resign
        </button>
      )}
    </div>
  );
};

export default BoardSidePane;
