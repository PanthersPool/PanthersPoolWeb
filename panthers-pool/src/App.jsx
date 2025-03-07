
import React from "react";
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LaunchPage from "./LaunchPage";
import FindRide from "./FindRide";
import DriverSignUp from "./DriverSignUp.jsx";
import ConfirmationPage from "./ConfirmationPage.jsx";
import MapPage from "./MapPage"
import SelectRide from "./SelectRide"
import RegisterPage from "./RegisterPage"
import "./App.css";
import RideOption from "./rideOption.jsx";
import ProfilePage from "./ProfilePage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaunchPage />} />
        <Route path="/find-ride" element={<FindRide />} />
        <Route path="/driver-sign-up" element={<DriverSignUp />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/map-page" element={<MapPage/>} />
        <Route path="/select-ride" element={<SelectRide />} />
        <Route path="/ride-options" element={<RideOption />} />
        <Route path="/profile-page" element={<ProfilePage />} />

      </Routes>
    </Router>
  );
}

export default App;
