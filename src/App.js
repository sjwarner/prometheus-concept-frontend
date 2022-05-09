import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/Homepage/Homepage";
import LocalMultiplayerPage from "./pages/LocalMultiplayer/LocalMultiplayerPage";
import CreateGamePage from "./pages/CreateGame/CreateGamePage";

function App() {
  return (
      <div className="app">
        <Router>
          <div>
            <Routes>
              <Route path="/create" element={<CreateGamePage />} />
              <Route path="/join">
                {/*<React.Fragment><div>Join game</div></React.Fragment>*/}
              </Route>
              <Route path="/local-multiplayer" element={<LocalMultiplayerPage />} />
              <Route path="/" element={<Homepage />} />
            </Routes>
          </div>
        </Router>
      </div>
  );
}

export default App;
