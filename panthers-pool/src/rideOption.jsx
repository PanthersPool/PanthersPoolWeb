import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom";

export default function RideOption({departure, destination, date, time, bags, seats, setActiveRide, id, riderID, requests}) {
    const navigate = useNavigate();
    const newDate = new Date(date);

    const formattedDate = newDate.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
    })

    const formattedTime = newDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })

    const handleConfirmRoute = (event) => {
        event.preventDefault();
        // Optionally, process form data here
        setActiveRide({
            rideID: id,
            origin: departure,
            destination: destination,
            date: date,
            time: time,
            bags: bags, 
            riderID: riderID,
            requests: requests
        });
        navigate("/confirmation");
    };

    return (
        <div>
            <h2>{`${departure} to ${destination}.`}</h2>
            <h3>{`${formattedDate}, ${formattedTime} `}</h3>
            {
                (bags) ?
                <p>Luggage space available</p>
                :
                <p>Luggage space not available</p>
            }
            {(seats === 1)
                ?
                <p>{`${seats} seat left`}</p>
                :
                <p>{`${seats} seats left`}</p>
            }
            
            <button onClick={handleConfirmRoute}>Confirm Route</button>
        </div>
    )

}

RideOption.propTypes = {
    departure: PropTypes.string,
    destination: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    bags: PropTypes.string,
    price: PropTypes.number,
    setActiveRide: PropTypes.func,
    id: PropTypes.number,
    riderID: PropTypes.arrayOf(PropTypes.number),
    requests: PropTypes.arrayOf(PropTypes.number)
}