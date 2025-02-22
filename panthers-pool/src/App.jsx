import React from "react";
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LaunchPage from "./LaunchPage";
import FindRide from "./FindRide";
import DriverSignUp from "./DriverSignUp.jsx";
import ConfirmationPage from "./ConfirmationPage.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaunchPage />} />
        <Route path="/find-ride" element={<FindRide />} />
        <Route path="/driverSignUp" element={<DriverSignUp />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
