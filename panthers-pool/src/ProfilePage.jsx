import React, { useEffect } from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import "./ProfilePage.css";
import ProfilePicture from "./assets/ProfilePic.webp";

export default function ProfilePage({ confirmedRide, setConfirmedRide }) {

    // Used so the user can change the values
    const [emailChange, setEmailChange] = useState(true);
    const [phoneChange, setPhoneChange] = useState(true);
    const [passwordChange, setPasswordChange] = useState(true);
    const [carMakeChange, setCarMakeChange] = useState(true);
    const [carColorChange, setCarColorChange] = useState(true);
    const [licenseChange, setLicenseChange] = useState(true);

    // Used to set values
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [carColor, setCarColor] = useState("");
    const [carMake, setCarMake] = useState("");
    const [carPlate, setCarPlate] = useState("");

    const [pastRides, setPastRides] = useState([]);
/*
    const rides = [{ driver: "Will", pickup: "Battel", dropoff: "ADK", rider: "Mike", date: "12/01/24" },
    { driver: "Josef", pickup: "Atwater", dropoff: "Burly", rider: "Mike", date: "12/01/24" },
    { driver: "Owen", pickup: "Stew", dropoff: "New York", rider: "Mike", date: "12/01/24" },
    { driver: "Zeyi", pickup: "Proctor", dropoff: "Boston", rider: "Mike", date: "12/01/24" },
    { driver: "Jackson", pickup: "Mili", dropoff: "14 old Chapel", rider: "Mike", date: "12/01/24" },
    ];
    */
    const isDriver = true; // Just a placeholder object will have -> isDriver? true or false
    const id = 1;
    useEffect(() => {
        const fetchProfile = async () => {
            
            if (isDriver) {
                try {
                    const response = await fetch(`/api/driver?driverID=${id}`);
                   console.log("Driver Info");
                    console.log(response);
                    if (response.ok) {
                        const profile = await response.json();
                        setFirstName(profile.firstName);
                        setLastName(profile.lastName)
                        setEmail(profile.email);
                        setPhone(profile.phone);
                        setCarColor(profile.carColor);
                        setCarMake(profile.carMake);
                        setCarPlate(profile.carPlate);
                    }
                } catch (error) {
                    console.error("Error fetching driver", error);
                }
                try{
                    const response = await fetch (`api/rides?driverID=${id}`);
                    console.log("PastRides");
                    console.log(response);
                    if (response.ok){
                        const pastRides = await response.json();
                        setPastRides(pastRides);
                    }
                } catch (error) {
                    console.error("Error fetching pastRides", error);
                }
            } 
            if (!isDriver) {
                try {
                    const response = await fetch(`/api/profilePage/rider?riderID=${id}`);
                    if (response.ok) {
                        const profile = await response.json();
                        setFirstName(profile.firstName);
                        setLastName(profile.lastName)
                        setEmail(profile.email);
                        setPhone(profile.phone)
                    }
                } catch (error) {
                    console.error("Error fetching rider", error);
                }
                try{
                    const response = await fetch (`api/rides?riderID=${id}`);
                    if (response.ok){
                        const pastRides = await response.json();
                        setPastRides(pastRides);
                    }
                } catch (error) {
                    console.error("Error fetching pastRides", error);
                }
            }   
        }
        fetchProfile();
    }, [])
    

    function generateTable(pastRides, isDriver) {
        return (
            <div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>{isDriver ? "Rider Name" : "Driver Name"}</th>
                            <th>Pickup Location</th>
                            <th>Dropoff Location</th>
                            <th>Date </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastRides.slice(0, 5).map((ride, index) => (
                            <tr key={index}>
                                <td>{isDriver ? ride.rider : ride.driver}</td>
                                <td>{ride.pickup}</td>
                                <td>{ride.dropoff}</td>
                                <td>{ride.date} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }


    

    const handleClick = () => {
        setConfirmedRide(null)
    }
    return (
        <div>
            <NavBar />
            <div className="content">
                <div>
                    <img src={ProfilePicture} width={200} height={200} />
                </div>
                {
                    (confirmedRide) ?

                        <div>
                            <h1>Confirmed Ride:</h1>
                            <div>
                                <p>{`${confirmedRide.departure}`}</p>
                                <p>{`${confirmedRide.destination}`}</p>
                                <p>{`${confirmedRide.date}`}</p>
                                <p>{`${confirmedRide.time}`}</p>
                                <p>{`${confirmedRide.bags}`}</p>
                                <p>{`$${confirmedRide.price}`}</p>
                            </div>
                            <button onClick={() => handleClick()}>Cancel Ride</button>
                        </div>
                        :
                        <div>
                            <h1>No Rides Confirmed</h1>
                        </div>

                }

                <div>
                    <h1> {firstName && lastName} </h1>
                    {(emailChange) ?
                        (<p> {`Email: ${email}`} </p>) :
                        <input type="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />}
                    <button onClick={() => { emailChange ? setEmailChange(false) : setEmailChange(true) }}>  {emailChange ? "Change Email" : "Submit"}   </button>

                    {(phoneChange) ?
                        (<p> {`Phone Number: ${phone} `} </p>) :
                        <input type="phone" value={phone} placeholder="Enter your phone" onChange={(e) => setPhone(e.target.value)} />}
                    <button onClick={() => { phoneChange ? setPhoneChange(false) : setPhoneChange(true) }} >  {phoneChange ? "Change Phone Number" : "Submit"} </button>

                </div>
                {/* Driver or Rider Portal*/}
                <div>
                    {(isDriver) ? (
                        <div > <h1>Driver Information </h1>

                            {(carMakeChange) ?
                                (<p> {`Car: ${carMake}`} </p>) :
                                <input type="carMake" value={carMake} placeholder="Enter your car make" onChange={(e) => setCarMake(e.target.value)} />}
                            <button onClick={() => { carMakeChange ? setCarMakeChange(false) : setCarMakeChange(true) }} >  {carMakeChange ? "Change Car Make" : "Submit"} </button>

                            {(carColorChange) ?
                                (<p> {`Car Color: ${carColor}`} </p>) :
                                <input type="carColor" value={carColor} placeholder="Enter your car color" onChange={(e) => setCarColor(e.target.value)} />}
                            <button onClick={() => { carColorChange ? setCarColorChange(false) : setCarColorChange(true) }} >  {carColorChange ? "Change Car Color" : "Submit"} </button>

                            {(licenseChange) ?
                                (<p> {`License #: ${carPlate}`} </p>) :
                                <input type="license" value={carPlate} placeholder="Enter your license #" onChange={(e) => setcarPlate(e.target.value)} />}
                            <button onClick={() => { licenseChange ? setLicenseChange(false) : setLicenseChange(true) }} >  {licenseChange ? "Change License #" : "Submit"} </button>

                        </div>) :
                        <h1>Rider Information </h1>}
                    <div>
                        <h3> Past 5 Rides </h3>
                        {generateTable(pastRides, isDriver)}

                    </div>
                </div>

            </div>
        </div>
    )


};