import { useState } from "react";
import "./DriverSignUp.css";
import "./NavBar.css";
import NavBar from "./NavBar.jsx";

function DriverSignup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        ssn: "",
        license: "",
        carPlate: "",
        payment: "",
        accidentHistory: "No",
        weatherComfort: "No",
        insured: "Yes",
        maintenance: "Yes",
        codeOfConduct: "Yes",
        licensePhoto: null,
        carPhoto: null,
        idPhoto: null,
        profilePhoto: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    return (
        <div className="driver-signup">
            < NavBar />
            <div className="signup-box">
                <div className="basic-info-container">
                    <h2 className="signup-title">Driver Sign Up →</h2>
                    <div className="input-group">
                        <label>First Name</label>
                        <input className="input-field" name="firstName" onChange={handleChange}/>
                    </div>
                    <div className="input-group">
                        <label>Last Name</label>
                        <input className="input-field" name="lastName" onChange={handleChange}/>
                    </div>
                    <div className="input-group">
                        <label>Age</label>
                        <input className="input-field" type="number" name="age" onChange={handleChange}/>
                    </div>
                    <div className="input-group">
                        <label>Social Security Number</label>
                        <input className="input-field" name="ssn" onChange={handleChange}/>
                    </div>
                    <div className="input-group">
                        <label>Driver’s License</label>
                        <input className="input-field" name="license" onChange={handleChange}/>
                    </div>
                    <div className="input-group">
                        <label>Car Plate</label>
                        <input className="input-field" name="carPlate" onChange={handleChange}/>
                    </div>
                    <div className="input-group">
                        <label>Card/Venmo/Zelle</label>
                        <input className="input-field" name="payment" onChange={handleChange}/>
                    </div>
                </div>

                <div className="question-and-upload">
                <div className="question-container">
                    <div className="input-group">
                        <label>Have you been in a major accident?</label>
                        <select className="select-field" name="accidentHistory" onChange={handleChange}>
                            <option>No</option>
                            <option>Yes</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Comfortable driving in varying weather?</label>
                        <select className="select-field" name="weatherComfort" onChange={handleChange}>
                            <option>No</option>
                            <option>Yes</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Is your vehicle insured?</label>
                        <select className="select-field" name="insured" onChange={handleChange}>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Do you maintain your vehicle?</label>
                        <select className="select-field" name="maintenance" onChange={handleChange}>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Will you follow the code of conduct?</label>
                        <select className="select-field" name="codeOfConduct" onChange={handleChange}>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                </div>



                <div className="file-upload-container">
                    <div className="file-upload">
                        <label>License Photo</label>
                        <input type="file" name="licensePhoto" onChange={handleFileChange} />
                    </div>
                    <div className="file-upload">
                        <label>Car Photo</label>
                        <input type="file" name="carPhoto" onChange={handleFileChange} />
                    </div>
                    <div className="file-upload">
                        <label>ID Photo</label>
                        <input type="file" name="idPhoto" onChange={handleFileChange} />
                    </div>
                    <div className="file-upload">
                        <label>Profile Picture</label>
                        <input type="file" name="profilePhoto" onChange={handleFileChange} />
                    </div>
                </div>

                <button className="submit-button">Submit</button>
                </div>
            </div>
        </div>
    );
}

export default DriverSignup;