import React from "react";
import { Link } from "react-router-dom";

const Modal = ({ type, children }) => {
  const colour = type === "Error" ? "bg-red-200" : "";

  return (
    <div className="fixed top-0 w-full h-screen bg-gray-900 bg-opacity-50 z-10">
      <div className="modal-dialog relative w-auto m-4 pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div
            className={`modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md ${colour}`}
          >
            <h5
              className="text-xl font-medium leading-normal text-gray-800"
              id="exampleModalLabel"
            >
              {type}
            </h5>
          </div>
          <div className="modal-body relative p-4 text-center">{children}</div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-around p-4 border-t border-gray-200 rounded-b-md">
            <Link
              className="block bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              to="/"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
