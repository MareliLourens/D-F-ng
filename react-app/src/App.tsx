import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthService from '../src/services/authService';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {

    // const isAuthenticated = localStorage.getItem('user'); // Check for authentication

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                {/* <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                /> */}
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route path="*" element={<Navigate to="/login" />} /> */}
            </Routes>
        </Router>
    );
}

const handleLogout = () => {
    AuthService.logout();

};

export default App;