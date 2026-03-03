import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // FIXED: Cleaned URL to fix 401 Unauthorized errors
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            
            // Save both token and user object (includes isAdmin)
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            alert(`Welcome back, ${data.user.name}!`);
            navigate('/');
            window.location.reload(); // Refreshes header to show Profile/Admin links
        } catch (err) {
            setError(err.response?.data?.message || "Invalid Email or Password");
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label>Email Address</label>
                        <input type="email" className="form-control" placeholder="Enter your email"
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter your password"
                            value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <p className="mt-3 text-center">Don't have an account? <Link to="/register">Create a New Account</Link></p>
            </div>
        </div>
    );
};

export default Login;