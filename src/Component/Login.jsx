import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Style/Signup.css';

const CoffeeLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Sending login request to the backend
            const response = await axios.post(
                "http://localhost:5000/api/auth/login", 
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            const { token } = response.data; // Extract token from response

            // Save token to local storage
            localStorage.setItem("token", token);

            // Redirect to dashboard
            navigate("/dashboard");
        
        } catch (error) {
            setErrorMessage(error.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="coffee-login-container">
            <div className="form-section">
                <div className="logo">Clothing Shop</div>
                <h2>Welcome Back!</h2>
                <p>Please log in to continue.</p>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <form onSubmit={handleLogin}>
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

                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>

                <div className="forgot-password">
                    <a href="#">Forgot Password?</a>
                </div>

                <div className="signup-section">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>

            <div className="image-section">
                {/* Background or image for the right section */}
            </div>
        </div>
    );
};

export default CoffeeLogin;
