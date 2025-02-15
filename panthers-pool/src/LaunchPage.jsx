import React from "react";
import NavBar from "./NavBar";
import "./LaunchPage.css";

const LaunchPage = () => {
  return (
    <div className="launch-page">
      <NavBar /> {}
      <div className="center-buttons">
        <button className="sign-in">I need a ride </button>
        <button className="sign-up">I am driving</button>
      </div>
    </div>
  );
};

export default LaunchPage;
