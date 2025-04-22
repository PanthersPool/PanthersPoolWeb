import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConfirmationPage.css";
import placeholderMap from "./assets/placeholder1.png";

function ConfirmationPage( {activeRide, setConfirmedRide}) {

    const navigate = useNavigate()

    const confirmDate = new Date(activeRide.date)

    const formattedDate = confirmDate.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
    })

    const formattedTime = confirmDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })

    console.log(activeRide)

    const handleClick = async () => {
            try {
                const temp = [...activeRide.requests]
                temp.push(0)
                const newRequests = temp
                const response = await fetch(`http://localhost:3000/api/allRides?rideID=${activeRide.rideID}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newRequests)
                });
                
                const data = await response.json();
    
                if (response.ok) {
                    alert('Confirmation successful!');
                    navigate('/profile-page') // ✅ Redirect after success
                } else {
                    alert(data.error || 'Confirmation failed.');
                }
            } catch (error) {
                console.error('Confirmation error:', error);
                alert('Confirmation failed due to server error.');
            }
        

    }

    

    return (
        <div className="confirmation-page">
            <div className="confirmation-container">
                <div className="confirmation-card">
                    <h2>Confirmation</h2>
                    <p className="price"><strong>{`${activeRide.origin} to ${activeRide.destination}`}</strong></p>
                    <ul>
                        <li>{`${formattedDate}, ${formattedTime}`}</li>
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