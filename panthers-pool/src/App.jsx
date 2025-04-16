
import React from "react";
import { createContext, useContext, useEffect, useState } from 'react';
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
import LoginPage from "./LoginPage.jsx"
import SignIn from "./SignIn.jsx"
import { AuthProvider } from './AuthContext';

function App() {
  const [confirmedRide, setConfirmedRide] = useState()

const ride =  { 
  "rideID": 2,
  "driverID": 2,
  "destination": "London",
  "departureTime": "2025-06-08T12:00:00",
  "spotsRemaining": 1,
  "luggageSpace": true,
  "atLeastOnePassenger": false,
  "completed": false,
  "riderID": []
}

const [activeRide, setActiveRide] = useState(ride)

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LaunchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/find-ride" element={<FindRide />} />
          <Route path="/driver-sign-up" element={<DriverSignUp />} />
          <Route path="/confirmation" element={<ConfirmationPage activeRide={activeRide} setConfirmedRide={setConfirmedRide}/>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/map-page" element={<MapPage setConfirmedRide={setConfirmedRide}/>} />
          <Route path="/select-ride" element={<SelectRide setActiveRide = {setActiveRide}/>} />
          <Route path="/ride-options" element={<RideOption />} />
          <Route path="/profile-page" element={<ProfilePage confirmedRide={confirmedRide} setConfirmedRide={setConfirmedRide}/>} />
          <Route path="/signin" element={<SignIn/> } />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
