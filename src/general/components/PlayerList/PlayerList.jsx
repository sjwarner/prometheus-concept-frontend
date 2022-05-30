import React from "react";
import { ReactSortable } from "react-sortablejs";
import FeatherIcon from "feather-icons-react";

const PlayerList = ({ socket, players, setPlayers }) => {
  const handleListUpdate = (newPlayerOrder) => {
    setPlayers(newPlayerOrder);
    socket.emit("playerOrderUpdated", newPlayerOrder);
  };

  return (
    <div className="readyUnitContainer">
      <ReactSortable
        list={players}
        setList={(newPlayerOrder) => {
          handleListUpdate(newPlayerOrder);
        }}
      >
        {players.map((player, index) => {
          let ready;
          let readyUnitColor = "#E46258";
          if (player.isReady) {
            ready = <b>Ready!</b>;
            readyUnitColor = "#73C373";
          } else {
            ready = <b>Not Ready</b>;
          }
          return (
            <div
              className="readyUnit"
              style={{ backgroundColor: readyUnitColor }}
              key={index}
            >
              <div className="flex justify-between p-2">
                <div className="flex">
                  <FeatherIcon
                    icon="shuffle"
                    alt="Drag and drop player order"
                  />
                  <p className="ml-1">
                    {index === 0 ? "White" : "Black"}: {player.name}
                  </p>
                </div>
                <p>{ready}</p>
              </div>
            </div>
          );
        })}
      </ReactSortable>
    </div>
  );
};

export default PlayerList;
