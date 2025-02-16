import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LaunchPage from "./LaunchPage";
import FindRide from "./FindRide";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaunchPage />} />
        <Route path="/find-ride" element={<FindRide />} />
      </Routes>
    </Router>
  );
}

export default App;
