import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

export default function LoginPage () {
    const navigate = useNavigate()

    return (
        <div className="signIn-container">
            <div className="signIn-box">
                <h1>Start Riding</h1>
                <div className="button-group">
                    <button onClick={() => navigate('/signin')}>Sign-In</button>
                </div>
            </div>

            <div className="createAccount-box">
                <h2>Not signed up yet?</h2>
                <div className="button-group">
                    <button onClick={() => navigate('/register')}>Create Account</button>
                </div>
            </div>
        </div>
        
    )
}