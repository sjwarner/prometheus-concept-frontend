import React from "react";

const Cube = ({ colour }) => {
  const fillColour = colour === "black" ? "black" : "whitesmoke";
  const strokeColour = "#d4af37";

  return (
    <div className="cube">
      <svg viewBox="0 0 100 100">
        <rect
          height="100"
          width="100"
          y="0"
          x="0"
          fill={fillColour}
          stroke={strokeColour}
          strokeWidth="5"
        />
      </svg>
    </div>
  );
};

export default Cube;
