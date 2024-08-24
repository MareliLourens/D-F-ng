import React, { useState } from 'react';
import { useAuthService } from '../services/authService';
import { useNavigate } from "react-router-dom";
import * as Components from '../Component';

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
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            {!isOtpSent ? (
                <form onSubmit={handleSignUp}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            ) : (
                <form onSubmit={handleOtpValidation}>
                    <div>
                        <label>OTP:</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Validate OTP</button>
                </form>
            )}
            <br /><br /><br />
            <button onClick={() => navigate('/Dashboard')}>Sign In</button>
        </div>
    );
};

export default Signup;