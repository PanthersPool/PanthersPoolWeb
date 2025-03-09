import React from "react";
import NavBar from "./NavBar";
import "./NavBar.css";
import "./FindRide.css";
import { useNavigate } from "react-router-dom";

const FindRide = () => {
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    // Optionally, process form data here

    navigate("/select-ride");
  };

  return (
    <div>
      <NavBar />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="departure">Departure:</label>
            <input type="text" id="departure" name="departure" />
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination:</label>
            <input type="text" id="destination" name="destination" />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input type="time" id="time" name="time" />
          </div>
          <div className="form-group">
            <label htmlFor="luggage">Luggage/Carryon:</label>
            <input type="text" id="luggage" name="luggage" />
          </div>
          <div className="form-group">
            <label htmlFor="passengers">Number of Passengers:</label>
            <select id="passengers" name="passengers">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5+</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input type="range" id="price" name="price" min="0" max="100" />
          </div>
          <button type="submit">Find Ride</button>
        </form>
      </div>
    </div>
  );
};

export default FindRide;
