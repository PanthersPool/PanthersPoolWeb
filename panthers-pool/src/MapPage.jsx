import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mapImage from './assets/mapImage.png'
import './MapPage.css'
import NaveBar from './NavBar'

function MapPage({ setConfirmedRide }) {
  const [departure, setDeparture] = useState("")
  const [destination, setDestination] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [bags, setBags] = useState("")
  const [seats, setSeats] = useState(1)
  const [price, setPrice] = useState(0)

  const navigate = useNavigate()
  
  const handleClick = () => {
    const confirmedRide = {
      id: 0,
      departure: departure,
      destination: destination,
      bags: bags,
      date: date,
      time: time,
      seats: seats,
      price: price
    }

    setConfirmedRide(confirmedRide)
    navigate("/profile-page")
  }


  return (
    <>
        <NaveBar />
      <div className="container">
        <div className = "form-container">
        <h1>Turn Your Commute Into Cash!</h1>
            <div>
              <input type="text" placeholder="Your Departure" value={departure} onChange={(x) => setDeparture(x.target.value)}></input>
            </div>
            <div>
              <input type="text" placeholder="Your Destination" value={destination} onChange={(y) => setDestination(y.target.value)}></input>
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
