import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConfirmationPage.css";
import placeholderMap from "./assets/placeholder1.png";

function ConfirmationPage( {activeRide, setConfirmedRide}) {

    const navigate = useNavigate()

    const handleClick = () => {
        setConfirmedRide(activeRide)
        navigate('/profile-page')

    }

    return (
        <div className="confirmation-page">
            <div className="confirmation-container">
                <div className="confirmation-card">
                    <h2>Confirmation</h2>
                    <p className="price">$<strong>{`${activeRide.price}`}</strong></p>
                    <ul>
                        <li>{`ADK to ${activeRide.destination}`}</li>
                        <li>{`${activeRide.date}, ${activeRide.time}`}</li>
                        <li>1 Passenger</li>
                        <li>{`${activeRide.bags} bag`}</li>
                    </ul>
                    <button className="confirm-button" onClick={() => handleClick()}>Confirm</button>
                </div>

                <div className="footer">
                    <p><strong>Ride Together, Thrive Together.</strong></p>
                    <a href="/" className="portal-link">Home page →</a>
                </div>
            </div>
            <div className="google-map">
                <img className="place-holder-map" src={placeholderMap} alt="Google Map Placeholder"/>
            </div>
        </div>
    )
}

export default ConfirmationPage