import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // FIXED: Removed ':1' from the URL to prevent 500 error
            await axios.post('http://localhost:5000/api/auth/register', formData);
            alert("Registration Successful! Please Login.");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Try again.");
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Create a New Account</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Full Name</label>
                        <input type="text" className="form-control" placeholder="Enter name"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                        <label>Email Address</label>
                        <input type="email" className="form-control" placeholder="Enter email"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                <p className="mt-3 text-center">Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </div>
    );
};

export default Register;