<<<<<<< Updated upstream
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Screens/Login';
import Main from './Screens/Main';
import Admin from './Pages/Admin';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/main" element={<Main />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}

=======
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthService from '../src/services/authService';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Transactions from './Pages/Transactions/Transactions';
import SingleCoin from './Pages/SingleCoin/SingleCoin';
import SignUp from './Pages/SignUp';
import Log from './Pages/Log';
import AdminControl from './Pages/AdminControl/Admin';
import AdminViewAccount from './Pages/AdminControl/AdminViewAccount';

function App() {

    // const isAuthenticated = localStorage.getItem('user'); // Check for authentication

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Log />} />
                <Route path="/signup" element={<SignUp />} />
                {/* <Route
                    path="/dashboard"
                    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                /> */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/Transactions" element={<Transactions />} />
                <Route path="/single" element={<SingleCoin />} />
                <Route path="/admin" element={<AdminControl />} />
                <Route path="/admin/view-account" element={<AdminViewAccount />} />
                

                {/* <Route path="*" element={<Navigate to="/login" />} /> */}
            </Routes>
        </Router>
    );
}

// const handleLogout = () => {
//     AuthService.logout();

// };

>>>>>>> Stashed changes
export default App;