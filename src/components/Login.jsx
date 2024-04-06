// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Using useNavigate hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password,
                    expiresInMins: 30, // optional, defaults to 60
                })
            });

            const data = await response.json();

            if (data.token) {
                console.log('Login successful:', data);
                localStorage.setItem('token', data.token);
                navigate('/dashboard'); // Redirect to dashboard or desired path
            } else {
                console.error('Login failed:', data.message);
                // Handle login failure
            }
        } catch (error) {
            console.error('Login error:', error);
            // Handle error
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-4" style={{ maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <p className="mt-3 text-center">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
