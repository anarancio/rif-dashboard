import React from "react";
import "./index.css";

const TextContainer = ({ text = "No Info" }) => {
  return <label className="textArea">{text}</label>;
};

export default TextContainer;
