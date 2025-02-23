import PropTypes from "prop-types"

export default function RideOption({departure, destination, date, time, bags, price, setActiveRide, id}) {
    return (
        <div>
            <h2>{`${departure} to ${destination}.`}</h2>
            <h3>{date}</h3>
            <p>{`${time}. ${bags}`}</p>
            <p>{`$${price}`}</p>
            <button onClick={setActiveRide(id)}>Confirm route</button>
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