import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import RegisterImage from './assets/registerImage.png'

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleRegister = async () => {
        try {
            // Dummy riderID (you can generate this on backend or here)
            const riderID = Math.floor(Math.random() * 1000000);

            const response = await fetch('http://localhost:3000/api/auth/register/rider', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    riderID,
                    firstName,
                    lastName,
                    phone: phoneNumber,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration successful!');
                navigate("/map-page");
            } else {
                alert(data.error || 'Registration failed.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed due to server error.');
        }
    };

    return(
        <div>
        
            <h1>Register to Ride In Just A Few Steps!</h1>
            <div className="register-container">
              <div className="form-group">
                <input type="text" placeholder="First Name" onChange={(x) => setFirstName(x.target.value)}></input>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Last Name" onChange={(y) => setLastName(y.target.value)}></input>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Phone Number" onChange={(z) => setPhoneNumber(z.target.value)}></input>
              </div>
              <div className="form-group">
                <input type="text" placeholder="E-Mail" onChange={(z) => setEmail(z.target.value)}></input>
              </div>
              <div>
                <p>Password</p>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Password" onChange={(n) => setPassword(n.target.value)}></input>
              </div>
              <div>
                <button type="button" onClick={handleRegister} disabled={!(firstName && lastName && phoneNumber && email && password)}>Finish</button>
              </div>
              <div>
                <p>By clicking Finish, you confirm you have read and accepted the Terms of Use and Data protection regulations.</p>
              </div>
            </div>
            
        </div>
       
    )
}