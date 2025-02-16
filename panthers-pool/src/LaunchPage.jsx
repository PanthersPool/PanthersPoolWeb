import React from "react";
import NavBar from "./NavBar";
import "./LaunchPage.css";
import "./NavBar.css";

const LaunchPage = () => {
  return (
    <div className="launch-page">
      <NavBar /> {}
      <div className="center-buttons">
        <button className="need-ride">I need a ride </button>
        <button className="will-drive">I am driving</button>
      </div>
    </div>
  );
};

export default LaunchPage;
