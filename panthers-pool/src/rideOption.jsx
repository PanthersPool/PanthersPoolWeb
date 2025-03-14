import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom";

export default function RideOption({departure, destination, date, time, bags, price, seats, setActiveRide, id}) {
    const navigate = useNavigate();

    const handleConfirmRoute = (event) => {
        event.preventDefault();
        // Optionally, process form data here
        setActiveRide({
            id: id,
            departure: departure,
            destination: destination,
            date: date,
            time: time,
            bags: bags, 
            price: price
        });
        navigate("/confirmation");
    };

    return (
        <div>
            <h2>{`${departure} to ${destination}.`}</h2>
            <h3>{`${date}, ${time} `}</h3>
            <p>{`$${price}`}</p>
            <p>{`${bags} bag spaces left`}</p>
            <p>{`${seats} seats left`}</p>
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
    id: PropTypes.number
}