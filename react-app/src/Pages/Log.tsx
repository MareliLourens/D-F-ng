import React, { useState } from 'react';
import { useAuthService } from '../services/authService';
import { useNavigate } from "react-router-dom";
import * as Components from '../Component';
import { Button } from '../Component'; // Import the styled Button

const Log = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const authService = useAuthService();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await authService.login({ email, password });
            console.log('Login successful:', response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.userId);
            navigate('/Dashboard');
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    const backgroundStyle = {
        backgroundImage: 'url(../assets/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const containerStyle: React.CSSProperties = {
        maxWidth: '400px',
        padding: '40px',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column', // Ensure this is a valid CSS property
        alignItems: 'center',
    };

    const titleStyle: React.CSSProperties = {
        fontSize: '24px',
        marginBottom: '20px',
        textAlign: 'center' as React.CSSProperties['textAlign'], // Explicitly cast to the correct type
        color: '#333',
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        border: '1px solid #007bff', // Change border color
        borderRadius: '5px',
        backgroundColor: '#f0f8ff', // Change background color
    };

    const buttonStyle: React.CSSProperties = {
        width: '100%',
        padding: '12px',
        backgroundColor: '#007bff', // Match the signup button color
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    const buttonHoverStyle: React.CSSProperties = {
        backgroundColor: '#0056b3', // Change hover color
    };

    const errorStyle: React.CSSProperties = {
        color: 'red',
        textAlign: 'center', // Change this line
        marginTop: '10px',
    };

    return (
        <div style={backgroundStyle}>
            <div style={containerStyle}>
                <h2 style={titleStyle}>Login</h2>
                {error && <p style={errorStyle}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        style={inputStyle}
                    />
                    <a href="#">Forgot your password?</a>
                    <Button type="submit" className="button">Login</Button>
                    <p>Don't have an account? <a onClick={() => navigate('/signup')}>Sign Up</a></p>
                </form>
            </div>
        </div>
    );
};

export default Log;