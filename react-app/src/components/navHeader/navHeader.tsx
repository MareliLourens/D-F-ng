import './navHeader.css';
import { FaSearch, FaBell } from 'react-icons/fa'; // Importing the icons

function NavHeader() {
    return (
        <div className="nav-header">
            <div className="nav-header--heading">
                <div className="nav-header--h1">Welcome Back, Luca</div>
                <div className="h4">Buy, Transfer and Sell chips all in one place</div>
            </div>
            <div className="nav-header--controls">
                <div className="icon-circle">
                    <FaSearch className="icon" />
                </div>
                <div className="icon-circle">
                    <FaBell className="icon" />
                </div>
                <div className='nav-line'>

                </div>
                <div className="nav-header--profile">
                    <img src="https://images.unsplash.com/photo-1707928373566-6a8ac1308d9a?q=80&w=1546&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" className="profile-photo" />
                    <div className="profile-name">Luca Breebaart</div>
                </div>
            </div>
        </div>
    )
};

export default NavHeader;
