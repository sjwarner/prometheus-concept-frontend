import React from "react";

const Tetrahedron = ({colour}) => {
  const fillColour = colour === "black" ? "black" : "whitesmoke";
  const strokeColour = "#d4af37";

  return (
    <div className="tetrahedron">
      <svg viewBox="0 -5 100 100">
        <path d="M2.70666 86.0876L50.9746 2.48511L99.2426 86.0876H2.70666Z" fill={fillColour} stroke={strokeColour} strokeWidth="3"/>
        <path d="M50.9746 54.0695L47.4746 60.1316H54.4746L50.9746 54.0695Z" fill={strokeColour} />
        <line x1="2.49072" y1="86.2194" x2="45.792" y2="61.2194" stroke={strokeColour} strokeWidth="3"/>
        <line x1="56.1626" y1="61.2167" x2="99.4639" y2="86.2167" stroke={strokeColour} strokeWidth="3"/>
        <line x1="50.9771" y1="52.2212" x2="50.9771" y2="2.22119" stroke={strokeColour} strokeWidth="3"/>
      </svg>
    </div>
  )
};

export default Tetrahedron;
