import React, { ReactNode } from 'react';
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

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/dashboard" />;
    }

    return <>{children}</>;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Log />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/wallet" element={
                    <ProtectedRoute>
                        <Transactions />
                    </ProtectedRoute>
                } />
                <Route path="/single-coin" element={
                    <ProtectedRoute>
                        <SingleCoin />
                    </ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <ProtectedRoute adminOnly={true}>
                        <AdminControl />
                    </ProtectedRoute>
                } />
                <Route path="/admin/view-account" element={
                    <ProtectedRoute adminOnly={true}>
                        <AdminViewAccount />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;