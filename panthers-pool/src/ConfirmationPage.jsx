import { useState } from "react";
import "./ConfirmationPage.css";
import placeholderMap from "./assets/placeholder1.png";

function ConfirmationPage() {
    return (
        <div className="confirmation-page">
            <div className="confirmation-container">
                <div className="confirmation-card">
                    <h2>Confirmation</h2>
                    <p className="price">$<strong>30</strong></p>
                    <ul>
                        <li>ADK to Burlington Airport</li>
                        <li>March 9</li>
                        <li>11:00 AM</li>
                        <li>1 Passenger</li>
                        <li>1 Large Suitcase</li>
                    </ul>
                    <button className="confirm-button">Confirm</button>
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