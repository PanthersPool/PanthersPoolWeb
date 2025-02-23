import { useState } from 'react'
import mapImage from './assets/mapImage.png'
import RideOption from './rideOption'

export default function SelectRide() {
    const [activeRide, setActiveRide] = useState()
    const mockTrips = [ {
        id: 0,
        departure: 'ADK',
        destination: "Burlington",
        date: 'March 5',
        time: "9:00-11:00 AM",
        bags: "One carry-on",
        price: 30
    },
    {
        id: 1,
        departure: 'ADK',
        destination: "Burlington",
        date: 'March 5',
        time: "11:00 AM-1:00 PM",
        bags: "Two Suitcases",
        price: 60
    }
    ]

  
 
    return (
    <>
        <h1>Find similar trips</h1>

        {mockTrips.map((trip) => (
            <div key = {trip.id} className="trip-container">
                <div className="container">
                <RideOption departure={trip.departure} destination={trip.destination} date={trip.date} time={trip.time} bags={trip.bags} price={trip.price} setActiveRide={setActiveRide} id={trip.id}/>
                <img src={mapImage} width={250} height={250}/>
                </div>
            </div>
        ))}     
    </>
    )
}

