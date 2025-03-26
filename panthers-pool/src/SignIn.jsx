import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

export default function SignIn({ setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    role: 'rider'
                })
            });

            const data = await response.json();

            if (response.ok) {
                setIsLoggedIn(true);
                navigate('/');
            } else {
                alert(data.error || 'Invalid email or password');
            }
        } catch (err) {
            console.error('Login failed:', err);
            alert('Login failed');
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Middlebury Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}
