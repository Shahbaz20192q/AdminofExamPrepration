import React from "react";
import "./Buttons.css";

const PrimaryBtn = ({ type, text }) => {
  return (
    <button type={type} className="primaryBtn">
      {" "}
      {text}{" "}
    </button>
  );
};

export default PrimaryBtn;
