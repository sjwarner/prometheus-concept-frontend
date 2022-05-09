import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import LocalMultiplayerPage from "./Pages/LocalMultiplayerPage/LocalMultiplayerPage";
import Homepage from "./Pages/Homepage/Homepage";

function App() {
  return (
      <div className="app">
        <Router>
          <div>
            <Routes>
              <Route path="/create">
                {/*<React.Fragment><div>Create game</div></React.Fragment>*/}
              </Route>
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
