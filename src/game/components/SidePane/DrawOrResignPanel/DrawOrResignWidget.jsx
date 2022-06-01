import React from "react";
import Caption from "../../../../general/components/Caption/Caption";
import Button from "../../../../general/components/Button/Button";

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
        <Button
          disabled={!inProgress}
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
        </Button>
        <Button
          disabled={hasResigned || !inProgress}
          onClick={() => {
            setHasResigned(true);
            setInProgress(false);
            socket.emit("playerResigned", socket.id);
          }}
        >
          Resign
        </Button>
      </div>
      {hasOpponentOfferedDraw && (
        <>
          <Caption>Opponent offered draw:</Caption>
          <div className="flex flex-row lg:flex-col">
            <Button
              disabled={hasOfferedDraw || !inProgress}
              onClick={() => {
                setHasOpponentOfferedDraw(false);
                setIsGameDrawn(true);
                setInProgress(false);
                socket.emit("playerAcceptedDraw", socket.id);
              }}
            >
              Accept
            </Button>
            <Button
              disabled={hasOfferedDraw || !inProgress}
              onClick={() => {
                setHasOpponentOfferedDraw(false);
                socket.emit("playerDeclinedDraw", socket.id);
              }}
            >
              Decline
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default DrawOrResignWidget;
