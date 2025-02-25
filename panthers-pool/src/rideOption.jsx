import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom";

export default function RideOption({departure, destination, date, time, bags, price, setActiveRide, id}) {
    const navigate = useNavigate();

    const handleConfirmRoute = (event) => {
        event.preventDefault();
        // Optionally, process form data here
        setActiveRide(id);
        navigate("/confirmation");
    };

    return (
        <div>
            <h2>{`${departure} to ${destination}.`}</h2>
            <h3>{date}</h3>
            <p>{`${time}. ${bags}`}</p>
            <p>{`$${price}`}</p>
            <button onClick={handleConfirmRoute}>Confirm route</button>
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