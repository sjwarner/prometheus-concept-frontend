import React from 'react';

const Pyramid = ({colour}) => {
  const fillColour = colour === "black" ? "black" : "whitesmoke";
  const strokeColour = "#d4af37";

  return (
    <div className="pyramid">
      <svg viewBox="0 0 101 101">
        <rect x="1.4624" y="1.5033" width="98" height="98" fill={fillColour} stroke={strokeColour} strokeWidth="3"/>
        <line x1="54.5015" y1="54.5101" x2="99.7564" y2="99.7649" stroke={strokeColour} strokeWidth="3"/>
        <line x1="1.16902" y1="1.21184" x2="46.4239" y2="46.4667" stroke={strokeColour} strokeWidth="3"/>
        <line x1="46.4337" y1="54.5455" x2="1.17884" y2="99.8003" stroke={strokeColour} strokeWidth="3"/>
        <line x1="99.755" y1="1.20991" x2="54.5001" y2="46.4647" stroke={strokeColour} strokeWidth="3"/>
        <rect x="47.4624" y="47.5033" width="6" height="6" fill={strokeColour}/>
      </svg>
    </div>
  )
};

export default Pyramid;
