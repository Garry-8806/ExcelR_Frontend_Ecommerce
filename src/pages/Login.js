// src/pages/Login.js
import React, { useState, useContext } from 'react';
import api from '../services/api';
import { AppContext } from '../context/AppContext';
import '../styles/Login.css'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AppContext);
    const navigate = useNavigate(); // Initialize useNavigate here

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', formData);
            login(response.data);
            console.log('Login successful:', response.data);
            
            // Use navigate to redirect to home
            navigate('/'); // Adjust the path as necessary
            
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            // Optionally, set an error state to display a message to the user
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email" // Placeholder text
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
