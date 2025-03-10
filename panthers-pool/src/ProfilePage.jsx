import React from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import "./ProfilePage.css";
import ProfilePicture from "./assets/ProfilePic.webp";

export default function profilePage({ }) {

    const [emailChange, setEmailChange] = useState(true);
    const [phoneChange, setPhoneChange] = useState(true);
    const [passwordChange, setPasswordChange] = useState(true);
    const [carMakeChange, setCarMakeChange] = useState(true);
    const [carColorChange, setCarColorChange] = useState(true);
    const [licenseChange, setLicenseChange] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [carColor, setCarColor] = useState("");
    const [carMake, setCarMake] = useState("");
    const [license, setLicense]= useState("");


    const rides = [{ driver: "Will", pickup: "Battel", dropoff: "ADK", rider: "Mike", date: "12/01/24" },
    { driver: "Josef", pickup: "Atwater", dropoff: "Burly", rider: "Mike", date: "12/01/24" },
    { driver: "Owen", pickup: "Stew", dropoff: "New York", rider: "Mike", date: "12/01/24"},
    { driver: "Zeyi", pickup: "Proctor", dropoff: "Boston", rider: "Mike", date: "12/01/24" },
    { driver: "Jackson", pickup: "Mili", dropoff: "14 old Chapel", rider: "Mike", date: "12/01/24" },
    ];

    function generateTable(rides, isDriver) {
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
                        {rides.slice(0, 5).map((ride, index) => (
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


    const isDriver = true; // Just a placeholder object will have -> isDriver? true or false
    return (
        <div>
            <NavBar />
            <div className="content">
                <div>
                    <img src={ProfilePicture} width={200} height={200} />
                </div>

                <div>
                    <h1> Name </h1>
                    {(emailChange) ?
                        (<p> { `Email: ${email}` } </p>) :
                        <input type="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />}
                    <button onClick={() => { emailChange ? setEmailChange(false) : setEmailChange(true) }}>  {emailChange ? "Change Email" : "Submit"}   </button>

                    {(phoneChange) ?
                        (<p> {`Phone Number: ${phone} `} </p>) :
                        <input type="phone" value={phone} placeholder="Enter your phone" onChange={(e) => setPhone(e.target.value)} />}
                    <button onClick={() => { phoneChange ? setPhoneChange(false) : setPhoneChange(true) }} >  {phoneChange ? "Change Phone Number" : "Submit"} </button>

                    {(passwordChange) ? (
                        <div>
                            {passwordVisible ?
                                <p> {`Password: ${password} `} </p> :
                                <p>{"Password:" + "*".repeat(password.length)}</p>
                            }
                            <button onClick={() => setPasswordVisible(!passwordVisible)}>  {passwordVisible ? "Hide" : "Show"} </button>
                        </div>) :
                        <input type="password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />}
                    <button onClick={() => { passwordChange ? setPasswordChange(false) : setPasswordChange(true) }}> {passwordChange ? "Change Password" : "Submit"} </button>
                </div>
                {/* Driver or Rider Portal*/}
                <div>
                    {(isDriver) ? (
                    <div > <h1>Driver Information </h1>
 
                     {(carMakeChange) ?
                    ( <p> {`Car: ${carMake}`} </p>) :
                    <input type="carMake" value={carMake} placeholder="Enter your car make" onChange={(e) => setCarMake(e.target.value)} />}
                    <button onClick={() => { carMakeChange ? setCarMakeChange(false) : setCarMakeChange(true) }} >  {carMakeChange ? "Change Car Make" : "Submit"} </button>
                    
                    {(carColorChange) ?
                    ( <p> {`Car Color: ${carColor}`} </p>) :
                    <input type="carColor" value={carColor} placeholder="Enter your car color" onChange={(e) => setCarColor(e.target.value)} />}
                    <button onClick={() => { carColorChange ? setCarColorChange(false) : setCarColorChange(true) }} >  {carColorChange ? "Change Car Color" : "Submit"} </button>

                    {(licenseChange) ?
                    ( <p> {`License #: ${license}`} </p>) :
                    <input type="license" value={license} placeholder="Enter your license #" onChange={(e) => setLicense(e.target.value)} />}
                    <button onClick={() => { licenseChange ? setLicenseChange(false) : setLicenseChange(true) }} >  {licenseChange ? "Change License #" : "Submit"} </button>
                     
                    </div>) :
                        <h1>Rider Information </h1>}
                    <div>
                        <h3> Past 5 Rides </h3>
                        {generateTable(rides, isDriver)}

                    </div>
                </div>

            </div>
        </div>
    )


};