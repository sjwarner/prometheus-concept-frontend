import React from "react";

const Footer = () => {
  return (
    <footer className="py-5 bg-black text-center text-white flex flex-row justify-between">
      <div>
        <p className="ml-8 mr-8">
          Learn the{" "}
          <a
            href="https://www.prometheusconcept.com/schedule"
            className="underline text-blue-300 hover:text-blue-400 visited:text-purple-600"
          >
            rules
          </a>
        </p>
      </div>
      <div>
        <p className="ml-8 mr-8">Some other content</p>
      </div>
    </footer>
  );
};

export default Footer;
