import React from "react";

const Tetrahedron = ({colour}) => {
  const fillColour = colour === "black" ? "black" : "whitesmoke";
  const strokeColour = "#d4af37";

  return (
    <div className="tetrahedron">
      <svg viewBox="0 10 100 100">
        <polygon points="50 15, 100 100, 0 100" style={{fill: fillColour, stroke: strokeColour, strokeWidth: 3}}/>
      </svg>
    </div>
  )
};

export default Tetrahedron;
