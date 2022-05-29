import React from "react";
import { Link } from "react-router-dom";

import Tetrahedron from "../../game/components/Pieces/Tetrahedron";

const Homepage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-xl font-bold">Welcome to Prometheus Concept!</h1>
      <p>A chess-like game, with fewer rules and more possibilities</p>
      <div className="w-32">
        <Tetrahedron />
      </div>
      <Link
        className="block mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        to="/create"
      >
        Create Game
      </Link>
      <Link
        className="block mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        to="/join"
      >
        Join Game
      </Link>
      <Link
        className="block mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        to="/local-multiplayer"
      >
        Local Multiplayer
      </Link>
    </div>
  );
};

export default Homepage;
