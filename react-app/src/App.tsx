import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Screens/Login';
import Dashboard from './Screens/Dashboard';
import AuthService from '../src/services/authService';

function App() {
    const isAuthenticated = localStorage.getItem('user'); // Check for authentication

    return (
        <Router>
            <Routes>
                {/* Public Route */}
                <Route path="/login" element={<Login />} />

                {/* Protected Route */}
                <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                />

                {/* Redirect to login if no route matches */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}




const handleLogout = () => {
    AuthService.logout();
    // Redirect to login page or homepage
};

export default App;