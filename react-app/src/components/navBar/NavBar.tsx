import './NavBar.css';
import { Link, useNavigate } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { LuWallet2, LuNewspaper } from "react-icons/lu";
import useAuthService from '../../services/authService';
import { RiAdminLine } from "react-icons/ri";


const Navbar = () => {
    const navigate = useNavigate();
    const authService = useAuthService();

    const handleLogout = () => {
        authService.logout();
        navigate('/'); // Redirect to login page after logout
    };
    return (
        <div className="nav-bar">
            <img src="https://images.unsplash.com/photo-1707928373566-6a8ac1308d9a?q=80&w=1546&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Logo" className="Logo" />
            <Link to="/dashboard" className="nav-btn">
                <IoGrid className="nav-btn" />
            </Link>
            <Link to="/Transactions" className="nav-btn">
                <LuWallet2 className="nav-btn" />
            </Link>
            <Link to="/single" className="nav-btn">
                <LuNewspaper className="nav-btn" />
            </Link>
            <Link to="/Admin" className="nav-btn">
                <RiAdminLine className="nav-btn" />
            </Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
    );
};

export default Navbar;
