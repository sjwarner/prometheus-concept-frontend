import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold">How did you get here?</h1>
      <p>
        Let's take you{" "}
        <Link
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          to="/"
        >
          home
        </Link>
        ...
      </p>
    </div>
  );
};

export default NotFoundPage;
