import React from "react";
import Style from "./EmptyNotice.module.css";

const EmptyNotice = ({ message }) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default EmptyNotice;
