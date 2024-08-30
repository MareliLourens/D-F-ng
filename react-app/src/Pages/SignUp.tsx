import React, { useState } from 'react';
import { useAuthService } from '../services/authService';
import { useNavigate } from "react-router-dom";
import * as Components from '../Component';
import './Login.css';

const backgroundStyle = {
    backgroundImage: 'url(../assets/background.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
};

const Signup = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
    const authService = useAuthService();
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await authService.signUp({ username, email, password });
            setIsOtpSent(true);
            alert('Sign up successful! Please check your email for OTP.');
        } catch (err) {
            setError('Sign up failed. Please try again.');
        }
    };

    const handleOtpValidation = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await authService.validateOtp({ email, otp });
            alert('OTP validation successful! You can now log in.');
            navigate('/Dashboard');
        } catch (err) {
            setError('OTP validation failed. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2 className="title">Sign Up</h2>
            {error && <p className="error">{error}</p>}
            {!isOtpSent ? (
                <Components.Form onSubmit={handleSignUp}>
                    <Components.Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        className="input"
                    />
                    <Components.Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="input"
                    />
                    <Components.Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="input"
                    />
                    <Components.Button type="submit" className="button">Sign Up</Components.Button>
                </Components.Form>
            ) : (
                <Components.Form onSubmit={handleOtpValidation}>
                    <Components.Input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="OTP"
                        required
                        className="input"
                    />
                    <Components.Button type="submit" className="button">Validate OTP</Components.Button>s
                </Components.Form>
            )}
            <p>Already have an account? <Components.Anchor onClick={() => navigate('/')}>Sign In</Components.Anchor></p>
        </div>
    );
};

export default Signup;