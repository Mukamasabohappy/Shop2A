import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; 
import '../Style/Signup.css'; 

const CoffeeLogin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                { name, email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Registration successful", response.data);
            setSuccessMessage("Account created successfully! Redirecting to dashboard...");

            // Redirect to dashboard after a short delay
            setTimeout(() => {
                navigate('/dashboard'); // Redirect to Dashboard
            }, 2000);

        } catch (error) {
            setErrorMessage(error.response?.data?.error || "Registration failed.");
        }
    };

    return (
        <div className="coffee-login-container">
            <div className="form-section">
                <div className="logo">Clothing Shop</div>
                <h2>Hello there.</h2>
                <p>Create an account to continue.</p>

                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="signup-button">
                        Sign up
                    </button>
                    <div className="terms-text">
                        By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                    </div>
                </form>
            </div>
            <div className="image-section"></div>
        </div>
    );
};

export default CoffeeLogin;
