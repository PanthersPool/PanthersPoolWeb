import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "./LaunchPage.css";
import "./NavBar.css";

const LaunchPage = () => {
  const navigate = useNavigate();

  return (
    <div className="launch-page">
      <NavBar />
      <div className="center-buttons">
        <button className="need-ride" onClick={() => navigate("/find-ride")}>
          I need a ride
        </button>
        <button className="will-drive">I am driving</button>
      </div>
    </div>
  );
};

export default LaunchPage;
