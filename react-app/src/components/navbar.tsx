import React from 'react';
import './navbar.css';
import CoinLogo from '../assets/CoinLogo.png';
import HomeIcon from '../assets/NavbarIcons/dashboard.png';
import AboutIcon from '../assets/NavbarIcons/info.png';
import ServicesIcon from '../assets/NavbarIcons/settings.png';
import TransIcon from '../assets/NavbarIcons/transaction.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <img src={CoinLogo} alt="Coin Logo" className="logo" />
            <ul>
                <li><a href="#home"><img src={HomeIcon} alt="Home" className="icon" /></a></li>
                <li><a href="#contact"><img src={TransIcon} alt="Contact" className="icon" /></a></li>
                <li><a href="#about"><img src={AboutIcon} alt="About" className="icon" /></a></li>
                <li><a href="#services"><img src={ServicesIcon} alt="Services" className="icon" /></a></li>
            </ul>
        </nav>
    );
};

export default Navbar;