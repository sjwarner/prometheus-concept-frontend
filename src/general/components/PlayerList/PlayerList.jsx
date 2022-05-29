import React from "react";
import { ReactSortable } from "react-sortablejs";

const PlayerList = ({ players, setPlayers }) => {
  return (
    <div className="readyUnitContainer">
      <ReactSortable
        list={players}
        setList={(newPlayerOrder) => setPlayers(newPlayerOrder)}
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
                <p>
                  {index === 0 ? "White" : "Black"}: {player.name}
                </p>
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
