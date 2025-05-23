import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mapImage from './assets/mapImage.png'
import './MapPage.css'
import NaveBar from './NavBar'
import { LoadScript } from '@react-google-maps/api';
import Autocomplete from 'react-google-autocomplete'


function MapPage({ setConfirmedRide }) {
  const [departure, setDeparture] = useState("")
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [bags, setBags] = useState("")
  const [seats, setSeats] = useState(1)
  const [price, setPrice] = useState(0)

  const navigate = useNavigate()

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API
  
  const handleClick = async () => {
    const rideToPost = {
      rideID: 20,
      driverID: 6,
      origin: departure["address_components"][0]["long_name"],
      destination: destination["address_components"][0]["long_name"],
      departureTime: `${date} ${time}`,
      spotsRemaining: seats,
      luggageSpace: bags,
      atLeastOnePassenger: true,
      Completed: false,
      riderID: [],
      requests: [],
      price: price
    }

    try {
      const response = await fetch('http://localhost:3000/api/allRides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rideToPost)
      })

      if (response.ok){
        alert('POST Successful')
        setConfirmedRide(confirmedRide)
        navigate("/profile-page")
      }
    }catch(error) {
      console.log("Error posting ride", error)
    }

    
  }  


  return (
    <>
        <NaveBar />
      <div className="container">
        <div className = "form-container">
        <h1>Turn Your Commute Into Cash!</h1>
            <div>
              <Autocomplete
                onPlaceSelected={(place) => {
                  setDeparture(place);
                }}
                options={{ componentRestrictions: { country: 'us' } }}
                id="departure"
                name="departure"
              />
           </div>
          <div>
              <Autocomplete
                onPlaceSelected={(place) => {
                  setDestination(place);
                }}
                options={{ componentRestrictions: { country: 'us' } }}
                id="destination"
                name="destination"
              />
            
          </div>
            <div>
              <input type="text" placeholder="Departure Date" value={date} onChange={(a) => setDate(a.target.value)}></input>
            </div>
            <div>
              <input type="text" placeholder="Departure Time" value={time} onChange={(a) => setTime(a.target.value)}></input>
            </div>
            <div>
              <input type="text" placeholder="Luggage/Carryon" value={bags} onChange={(b) => setBags(b.target.value)}></input>
            </div>
            <div>
              <input type="text" placeholder="# Of Riders" onChange={(z) => setSeats(z.target.value)}></input>
            </div>
            <div>
              <label htmlFor="prices">Price Range – $10-$100</label>
              <input type="range" min={0} max={100} id="prices" onChange={(n) => setPrice(n.target.value)}></input>
            </div>
            <div>
              <button type="button" onClick={()=> handleClick()} disabled={!(departure && destination && seats && price && time && bags)}>Enter</button>
            </div>
        </div>
            <div className = "image-container">
              <img src={mapImage} width={300} height={300} />
              <h2>Suggested Price: ${price * seats}</h2>
            </div>
            
        </div>
    </>
  )
}

export default MapPage
