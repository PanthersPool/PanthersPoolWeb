import { useNavigate } from 'react-router-dom'

export default function LoginPage () {
    const navigate = useNavigate()

    return (
        <div>
            <div>
            <h1>Start Riding</h1>
            <div>
                <button>Sign In</button>
            </div>
            <div>
                <a>Not signed up yet?</a>
                <div>
                    <p>Sign up to be a driver</p>
                    <button onClick={() => navigate('/driver-sign-up')}>Create Driver Account</button>
                </div>
                <div>
                    <p>Sign up to be a rider</p>
                    <button onClick={() => navigate('/register')}>Create Rider Account</button>
                </div>
                
            </div>
            </div>
        </div>
        
    )
}