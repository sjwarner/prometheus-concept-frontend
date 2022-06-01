import React from "react";

const Button = ({ className, onClick, disabled, children }) => {
  return (
    <button
      className={`block m-auto mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
