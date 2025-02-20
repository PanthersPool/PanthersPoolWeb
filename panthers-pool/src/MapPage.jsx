import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function MapPage() {
  const [departure, setDeparture] = useState("")
  const [destination, setDestination] = useState("")
  const [seats, setSeats] = useState(1)
  const [price, setPrice] = useState(0)

  const navigate = useNavigate()

  


  return (
    <>
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
              <input type="text" placeholder="# Of Riders" onChange={(z) => setSeats(z.target.value)}></input>
            </div>
            <div>
              <label htmlFor="prices">Price Range – $10-$100</label>
              <input type="range" min={0} max={100} id="prices" onChange={(n) => setPrice(n.target.value)}></input>
            </div>
            <div>
              <button type="button" onClick={()=> navigate("/select-ride")} disabled={!(departure && destination && seats && price)}>Enter</button>
            </div>
        </div>
            <div className = "image-container">
              <h2>Suggested Price: ${price * seats}</h2>
            </div>
            
        </div>
    </>
  )
}

export default MapPage
