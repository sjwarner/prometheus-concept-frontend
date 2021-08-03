import React, {useState} from "react";
import "./App.css";

import PrometheusBoard from "./PrometheusBoard";
import Players from "./Players";

function App() {
  const [inProgress, setInProgress] = useState(false);
  const [playerOneSpherePlaced, setPlayerOneSpherePlaced] = useState(false);
  const [playerTwoSpherePlaced, setPlayerTwoSpherePlaced] = useState(false);
  const [turn, setTurn] = useState(Players.PLAYER_ONE);

  const inProgressWithSpheresPlaced = inProgress && playerOneSpherePlaced && playerTwoSpherePlaced;

  return (
    <div className="app">
      <h1 className="mb-4">Prometheus Concept</h1>
      <PrometheusBoard inProgress={inProgress} playerOneSpherePlaced={playerOneSpherePlaced} playerTwoSpherePlaced={playerTwoSpherePlaced}
                       setPlayerOneSpherePlaced={setPlayerOneSpherePlaced} setPlayerTwoSpherePlaced={setPlayerTwoSpherePlaced}
      />
      <div className="below-board-container mt-4" >
        {!inProgress && (
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  onClick={() => setInProgress(true)}>
            Start!
          </button>
        )}
        {inProgress && !playerOneSpherePlaced && (
          <span> Place Player One's sphere.</span>
        )}
        {inProgress && playerOneSpherePlaced && !playerTwoSpherePlaced && (
          <span> Place Player Two's sphere.</span>
        )}
        {inProgressWithSpheresPlaced && (
          <span>{turn}'s turn.</span>
        )}
      </div>
    </div>
  );
}

export default App;
