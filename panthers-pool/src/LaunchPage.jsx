import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "./LaunchPage.css";
import "./NavBar.css";

const LaunchPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <div className="launch-page">
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="center-buttons">
        <button className="need-ride" onClick={() => (isLoggedIn) ? navigate("/find-ride") : navigate('/login')}>
          I need a ride
        </button>
        <button className="will-drive" onClick={() => (isLoggedIn) ? navigate("/map-page") : navigate('/login')}>I am driving</button>
      </div>
    </div>
  );
};

export default LaunchPage;
