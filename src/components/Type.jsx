import React from "react";

const Type = ({ type, setType }) => {
  return (
    <div className="selector-container">
      <p className="title">CHOOSE TYPE</p>

      <div className="selector-grid">

        <div
          className={`selector ${type === "LENGTH" ? "active" : ""}`}
          onClick={() => setType("LENGTH")}
        >
          <i className="fa-solid fa-ruler"></i>
          <p>Length</p>
        </div>

        <div
          className={`selector ${type === "WEIGHT" ? "active" : ""}`}
          onClick={() => setType("WEIGHT")}
        >
          <i className="fa-solid fa-weight-scale"></i>
          <p>Weight</p>
        </div>

        <div
          className={`selector ${type === "TEMPERATURE" ? "active" : ""}`}
          onClick={() => setType("TEMPERATURE")}
        >
          <i className="fa-solid fa-thermometer"></i>
          <p>Temperature</p>
        </div>

        <div
          className={`selector ${type === "VOLUME" ? "active" : ""}`}
          onClick={() => setType("VOLUME")}
        >
          <i className="fa-solid fa-flask"></i>
          <p>Volume</p>
        </div>

      </div>
    </div>
  );
};

export default Type;