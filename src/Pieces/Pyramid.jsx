import React from 'react';

const Pyramid = ({colour}) => {
  const fillColour = colour === "black" ? "black" : "whitesmoke";
  const strokeColour = "#d4af37";

  return (
    <div className="pyramid">
      <svg viewBox="0 0 100 100">
        <rect height="100" width="100" y="0" x="0" fill={fillColour} stroke={strokeColour} strokeWidth="5" />
        <ellipse ry="4" rx="4" cy="50" cx="50" fill={fillColour} stroke={strokeColour} strokeWidth="3" />
      </svg>
    </div>
  )
};

export default Pyramid;
