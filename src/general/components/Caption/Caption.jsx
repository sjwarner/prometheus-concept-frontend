import React from "react";

const Caption = ({ children }) => {
  return (
    <span className="block m-auto mt-4 bg-white text-gray-800 py-2 px-4">
      {children}
    </span>
  );
};

export default Caption;
