import React from "react";

const DrawOrResignWidget = ({
  socket,
  hasResigned,
  setHasResigned,
  inProgress,
  setInProgress,
  hasOfferedDraw,
  setHasOfferedDraw,
  hasOpponentOfferedDraw,
  setHasOpponentOfferedDraw,
  setIsGameDrawn,
}) => {
  return (
    <>
      <div className="flex flex-row lg:flex-col">
        <button
          className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => {
            if (!hasOfferedDraw) {
              setHasOfferedDraw(true);
              socket.emit("playerOfferedDraw", socket.id);
            } else {
              setHasOfferedDraw(false);
              socket.emit("playerWithdrewDrawOffer", socket.id);
            }
          }}
        >
          {!hasOfferedDraw ? "Offer Draw" : "Cancel Offer"}
        </button>
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
      </div>
      {hasOpponentOfferedDraw && (
        <>
          <span className="block m-auto mt-4 bg-white text-gray-800 py-2 px-4">
            Opponent offered draw:
          </span>
          <div className="flex flex-row lg:flex-col">
            <button
              className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow disabled:cursor-not-allowed disabled:opacity-50"
              disabled={hasOfferedDraw || !inProgress}
              onClick={() => {
                setHasOpponentOfferedDraw(false);
                setIsGameDrawn(true);
                setInProgress(false);
                socket.emit("playerAcceptedDraw", socket.id);
              }}
            >
              Accept
            </button>
            <button
              className="block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow disabled:cursor-not-allowed disabled:opacity-50"
              disabled={hasOfferedDraw || !inProgress}
              onClick={() => {
                setHasOpponentOfferedDraw(false);
                socket.emit("playerDeclinedDraw", socket.id);
              }}
            >
              Decline
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default DrawOrResignWidget;
