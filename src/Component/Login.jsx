import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import axios from 'axios'; // Import axios
import '../Style/Signup.css'; // Ensure correct path for CSS

const CoffeeLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for handling errors
    const navigate = useNavigate(); // Initialize navigate

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Sending login request to the backend
            const response = await axios.post(
                "http://localhost:5000/api/auth/login", 
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            // Save token to local storage
            localStorage.setItem("token", response.data.token);
            console.log("Login successful", response.data);

            // Redirect to dashboard
            navigate("/dashboard");

        } catch (error) {
            // Handle login error
            setErrorMessage(error.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="coffee-login-container">
            <div className="form-section">
                <div className="logo">Clothing Shop</div>
                <h2>Welcome Back!</h2>
                <p>Please log in to continue.</p>

                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Error message display */}

                <form onSubmit={handleLogin}> {/* Use handleLogin function */}
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
                    <p>Don't have an account?</p>
                    <Link to="/signup"> {/* Link to signup page */}
                        <button className="signup-button">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>

            <div className="image-section">
                {/* Background or image for the right section */}
            </div>
        </div>
    );
};

export default CoffeeLogin;
