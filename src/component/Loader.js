import React from "react";

const Loader = () => {
  return (
    <div className="loaderWraper loading bg-primary">
      <div
        className="spinner-grow text-warning"
        role="status"
        style={{ width: "100px", height: "100px" }}
      >
        <span className="sr-only"></span>
      </div>
    </div>
  );
};

export default Loader;
