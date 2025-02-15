import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import DriverSignUp from "./DriverSignUp.jsx";
import ConfirmationPage from "./ConfirmationPage.jsx";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<DriverSignUp />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
      </Router>
  )
}

export default App
