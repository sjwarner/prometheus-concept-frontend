import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/Homepage/Homepage";
import LocalMultiplayerPage from "./pages/LocalMultiplayer/LocalMultiplayerPage";
import CreateGamePage from "./pages/CreateGame/CreateGamePage";
import JoinGamePage from "./pages/JoinGame/JoinGamePage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import Footer from "./general/components/Footer/Footer";
import Tetrahedron from "./game/components/Pieces/Tetrahedron";

function App() {
  return (
      <div className="flex flex-col h-screen justify-between">
          <header className="py-5 bg-black text-white text-center flex flex-row justify-between">
              <div className="h-6 w-6 ml-8 mr-8">
                  <Tetrahedron />
              </div>
              Prometheus Concept
              <div className="h-6 w-6 ml-8 mr-8">
                  <Tetrahedron />
              </div>
          </header>
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
