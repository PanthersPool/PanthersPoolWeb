import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

export default function LoginPage () {
    const navigate = useNavigate()

    return (
        <div className="signIn-container">
            <div className="signIn-box">
                <h1>Start Riding</h1>
                <div className="button-group">
                    <button>Driver Sign-In</button>
                    <button>Rider Sign-In</button>
                </div>
            </div>

            <div className="createAccount-box">
                <h2>Not signed up yet?</h2>
                <div className="button-group">
                    <button onClick={() => navigate('/driver-sign-up')}>Create Driver Account</button>
                    <button onClick={() => navigate('/register')}>Create Rider Account</button>
                </div>
            </div>
        </div>
        
    )
}