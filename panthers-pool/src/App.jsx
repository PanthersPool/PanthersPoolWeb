import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MapPage from "./MapPage"
import SelectRide from "./SelectRide"
import RegisterPage from "./RegisterPage"
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/map-page" element={<MapPage/>} />
        <Route path="/select-ride" element={<SelectRide />} />
      </Routes>
    </Router>
  )
}

export default App
