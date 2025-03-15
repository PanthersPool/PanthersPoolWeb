import { useState, useEffect } from 'react'
import mapImage from './assets/mapImage.png'
import RideOption from './rideOption'
import NavBar from "./NavBar.jsx";
import "./SelectRide.css";

export default function SelectRide({ setActiveRide }) {

    /*
    const rides =[
        {
            id: 0, 
            departure: "ADK",
            destination: "Burlington",
            date: "March 5",
            time: "9:00AM",
            bags: 1,
            price: 50,
            seats: 6
        }
    ]
    */

   const [rides, setRides] = useState([]);

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const response = await fetch("/api/allRides");
                if(response.ok){
                    const rides = await response.json();
                    setRides(rides);
                }
            } catch (error) {
                console.error("Error fetching rides", error);
            }
        }
        fetchRides();
    }, [])



  
    return (
    <>
        <NavBar />
        <div className="select-ride-page">
        <h1>Find similar trips</h1>

        <div className="ride-options">
        {rides.map((trip) => (
            <div key = {trip.id} className="trip-container">
                <div className="container">
                <RideOption departure={trip.departure} destination={trip.destination} date={trip.date} time={trip.time} bags={trip.bags} price={trip.price} seats={trip.seats} setActiveRide={setActiveRide} id={trip.id}/>
                <img src={mapImage} width={250} height={250}/>
                </div>
            </div>
        ))}
        </div>
        </div>
    </>
    )
}

