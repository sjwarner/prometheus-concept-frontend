import React from 'react';

const PrometheusSquare = ({colour, piece, onClick}) => {
  return (
    <div className={`square square-${colour} text-red-500`} onClick={onClick}>{piece}</div>
  )
}

export default PrometheusSquare;
