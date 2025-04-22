import React, { useEffect } from "react";
import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import "./ProfilePage.css";
import ProfilePicture from "./assets/ProfilePic.webp";

export default function ProfilePage({ confirmedRide, setConfirmedRide }) {
    // console.log(confirmedRide)
    // Used so the user can change the values
    const [emailChange, setEmailChange] = useState(true);
    const [phoneChange, setPhoneChange] = useState(true);
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
    const [driverRequests, setDriverRequests] = useState("")
    const [driverConfirmations, setDriverConfirmations] = useState("")
    const [requestedRiders, setRequestedRiders] = useState("")
    const [requestedRides, setRequestedRides] = useState("")
    const [confirmedRiders, setConfirmedRiders] = useState("")

    const isDriver = true; // Just a placeholder object will have -> isDriver? true or false
    const id = 1;

     useEffect(() => {
        const fetchProfile = async () => {
            if (isDriver) {
                // Fetch Driver Information
                try {
                    const response = await fetch(`http://localhost:3000/api/driver?driverID=${id}`);
                    if (response.ok) {
                        const profile = await response.json();
                        setFirstName(profile[0].firstName);
                        setLastName(profile[0].lastName)
                        setEmail(profile[0].email);
                        setPhone(profile[0].phone);
                        setCarColor(profile[0].carColor);
                        setCarMake(profile[0].carMake);
                        setCarPlate(profile[0].carPlate);
                    }
                } catch (error) {
                    console.error("Error fetching driver", error);
                }

                // Set Request for Rides and Confirmed Rides
                try{
                    const response2 = await fetch(`http://localhost:3000/api/allRides?driverID=${id}`);
                    if(response2.ok){
                        const rides = await response2.json()
                        const requests = rides.filter((ride) => ride.requests.length > 0)
                        const confirmations = rides.filter((ride) => ride.riderID.length > 0)
                        setDriverRequests(requests)
                        setDriverConfirmations(confirmations)

                        const requestedRiders = []
                        requests.forEach((request) => {
                            request.requests.forEach((rider) => {
                                if(!requestedRiders.includes(rider)){
                                    requestedRiders.push(rider)
                                }
                            })
                        })

                        const confirmedRiders = []
                        confirmations.forEach((confirmation) => {
                            confirmation.riderID.forEach((rider) => {
                                if(!confirmedRiders.includes(rider)) {
                                    confirmedRiders.push(rider)
                                }
                            })
                        })

                        if(requestedRiders.length > 0){
                            const query1 = requestedRiders.map(id => `riderID=${id}`).join("&")
                            const response3 = await fetch(`http://localhost:3000/api/rider?${query1}`);
                            if(response3.ok){
                                const ridersRequest = await response3.json()
                                setRequestedRiders(ridersRequest)

                            }
                        }

                        if(confirmedRiders.length > 0){
                            const query2 = confirmedRiders.map(id => `riderID=${id}`).join("&")
                            const response4 = await fetch(`http://localhost:3000/api/rider?${query2}`);
                            if(response4.ok){
                                const confirmedRiderInformation = await response4.json()
                                setConfirmedRiders(confirmedRiderInformation)
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error fetching requests", error)
                }
                
            } 
                // Get rider information
                try {
                    const response = await fetch(`http://localhost:3000/api/rider?riderID=${id}`);
                    if (response.ok) {
                        const profile = await response.json();
                        setFirstName(profile[0].firstName);
                        setLastName(profile[0].lastName)
                        setEmail(profile[0].email);
                        setPhone(profile[0].phone)
                    }
                } catch (error) {
                    console.error("Error fetching rider", error);
                }

                // Get confirmed ride information
                try {
                    const response2 = await fetch(`http://localhost:3000/api/rides?riderIdSearch=${id}`);
                    if (response2.ok) {
                        const ride = await response2.json();
                        setConfirmedRide(ride[0])
                    }
                } catch (error) {
                    console.error("Error fetching ride", error)
                }

                // Get requested ride information
                try {
                    const response3 = await fetch(`http://localhost:3000/api/getRiderRequests?riderIdSearch=${id}`);
                    if (response3.ok) {
                        const requestRides = await response3.json();
                        setRequestedRides(requestRides)
                    }

                }catch (error) {
                    console.error("Error fetching requested rides", error)
                }
        }
        fetchProfile();
    }, [])

    //*****Rider methods*******

    //Rider cancels unconfirmed ride request ***Works***
    const cancelRideRequest = async (rideID) => {
        try{
            const response = await fetch(`http://localhost:3000/api/cancelRideRequest?rideID=${rideID}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ riderID: id })
            })
    
            if (response.ok){
                alert("Ride request successfully canceled")
            }
        }catch(error){
            console.log("Error canceling ride request", error)
        }
        
    }

    //Rider cancels confirmed ride request ***Works***
    const cancelConfirmedRideRequest = async (rideID) => {
        try{
            const response = await fetch(`http://localhost:3000/api/cancelConfirmedRide?rideID=${rideID}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ riderID: id })
            })

            if (response.ok){
                alert("Confirmed ride request successfully canceled")
            }
        }catch (error){
            console.log("Error canceling confirmed ride request", error)
        }
    }


    //*******Driver methods*******

    //Driver cancels ride **Works**
    const cancelRide = async(rideID) => {
        try{
            const response = await fetch(`http://localhost:3000/api/cancelRideRequest?rideID=${rideID}`, {
                method:'DELETE',
                headers: { 'Content-Type': 'application/json' },
            })

            if(response.ok){
                alert("Ride successfully canceled")
            }
        }catch (error){
            console.log("Error canceling ride", error)
        }
    }

    //Driver accepts ride request from rider **Works**
    const acceptRequest= async (id, rideID, requests, riderID) => {
        try {
            // If driver accepts request for a ride, delete the rider's ID from the ride's request array
            const newRequests = requests.filter((ids) => ids !== id)
            const response = await fetch(`http://localhost:3000/api/allRides?rideID=${rideID}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRequests)
            });
            const data = await response.json();

            if (response.ok) {
                // Then push the rider's ID to the ride's riderID array and store it

                alert('Confirmation successful!');
                const temp = [...riderID]
                temp.push(id)
                const newRiderID = temp
                const response2 = await fetch(`http://localhost:3000/api/rides?rideID=${rideID}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newRiderID)
                });
                
                const data2 = await response2.json()

                if(response2.ok){
                    alert('Update riderID successful!');
                }else{
                    alert(data.error || 'Update failed.');
                }
            } else {
                alert(data.error || 'Confirmation failed.');
            }
        } catch (error) {
            console.error('Confirmation error:', error);
            alert('Confirmation failed due to server error.');
        }
    }


    return (
        <div>
            <NavBar />
            <div className="content">
                <div>
                    <img src={ProfilePicture} width={200} height={200} />
                </div>

                {
                    //Show if driver currently has any posted rides
                    (isDriver) ?
                        (driverConfirmations.length > 0) ? 
                            <>
                        <h1>Posted Rides:</h1>
                            {driverConfirmations.map((confirmedRide) => 
                                <div>   
                                    <p>{`${confirmedRide.origin}`}</p>
                                    <p>{`${confirmedRide.destination}`}</p>
                                    <p>{`${confirmedRide.luggageSpace} bags`}</p>
                                    <div>
                                        <>
                                        { 
                                        (confirmedRide.riderID.length > 0 && confirmedRiders) ?
                                        <>
                                        <h3>Registered Riders</h3>
                                         {(confirmedRide.riderID.map((riders) =>
                                            <div>
                                                <p>{`${confirmedRiders[riders].firstName} ${confirmedRiders[riders].lastName}`}</p>
                                                <p>{`${confirmedRiders[riders].phone}`}</p>
                                                <p>{`${confirmedRiders[riders].email}`}</p>
                                            </div>
                                        ))}
                                        </>
                                            :
                                        <div></div>
                                        }
                                        </>
                                    </div>
                                    <button onClick={() => cancelRide(confirmedRide.rideID)}>Cancel Ride</button>
                                </div>
                            )}
                            </>
                        :
                        <div>
                            <h1>No Posted Rides</h1>
                        </div>
                    :
                    <div></div>
                }

                {
                    (isDriver) ?
                        (Object.keys(requestedRiders).length > 0) ?
                        <>
                            <h1>Unanswered Ride Requests:</h1>
                            {driverRequests.map((requestRide) => 
                                requestRide.requests.map((id) => 
                                <div>   
                                    <p>{`${requestedRiders[id].firstName} ${requestedRiders[id].lastName} is requesting the following ride`}</p>
                                    <p>{`${requestRide.origin}`}</p>
                                    <p>{`${requestRide.destination}`}</p>
                                    <button onClick={()=> acceptRequest(id, requestRide.rideID, requestRide.requests, requestRide.riderID)}>Accept Request</button>
                                </div>
                                )
                                
                            )}
                         </>
                        :
                        <div>No Ride Requests</div>
                    :
                    <div></div>
                }   

                {
                    //Show if Rider has any unconfirmed ride requests
                    (requestedRides.length > 0) ?
                        <>
                        <h1>Pending Ride Requests:</h1>
                        {requestedRides.map((requestedRide) =>
                            <div>
                                <p>{`${requestedRide.origin}`}</p>
                                <p>{`${requestedRide.destination}`}</p>
                                <p>{`${requestedRide.departureTime}`}</p>
                                <button onClick ={() => cancelRideRequest(requestedRide.rideID)}>Cancel Request</button>
                            </div>
                        )}
                        </>
                        :
                        <div>
                            <h1>No Pending Requests</h1>
                        </div>
                }


                {
                    // Show if Rider has a confirmed ride
                        (confirmedRide) ?
                            <div>
                                <h1>Confirmed Ride:</h1>
                                <div>
                                    <p>{`${confirmedRide.origin}`}</p>
                                    <p>{`${confirmedRide.destination}`}</p>
                                    <p>{`${confirmedRide.luggageSpace} bags`}</p>
                                </div>
                                <button onClick={() => cancelConfirmedRideRequest(confirmedRide.rideID)}>Cancel Ride Confirmation</button>
                            </div>
                        :
                            <div>
                                <h1>No Confirmed Rides</h1>
                            </div>

                }

                <div>
                    <h1> {`${firstName} ${lastName}`} </h1>
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

                        </div>
                    
                    ) :
                        <h1>Rider Information </h1>}
                </div>



            </div>
        </div>
    )


};