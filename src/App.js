import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";

import Homepage from "./pages/Homepage/Homepage";
import LocalMultiplayerPage from "./pages/LocalMultiplayer/LocalMultiplayerPage";
import CreateGamePage from "./pages/CreateGame/CreateGamePage";
import JoinGamePage from "./pages/JoinGame/JoinGamePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import Footer from "./general/components/Footer/Footer";
import Header from "./general/components/Header/Header";

function App() {
  return (
      <div className="flex flex-col h-screen justify-between">
          <Header />
          <main>
              <Router>
                  <div>
                      <Routes>
                          <Route path="/create" element={<CreateGamePage />} />
                          <Route path="/join" element={<JoinGamePage />} />
                          <Route
                              path="/local-multiplayer"
                              element={<LocalMultiplayerPage />}
                          />
                          <Route path="/" element={<Homepage />} />
                          <Route path="*" element={<NotFoundPage />} />
                      </Routes>
                  </div>
              </Router>
          </main>
          <Footer />
      </div>
  );
}

export default App;
