import React from 'react';
import './Main.css';

const Main = () => {
    return (
        <div className="main-container">
            <nav className="sidebar">
                <h2>MyApp</h2>
                <ul>
                    <li><a href="#dashboard">Dashboard</a></li>
                    <li><a href="#profile">Profile</a></li>
                    <li><a href="#settings">Settings</a></li>
                    <li><a href="#logout">Logout</a></li>
                </ul>
            </nav>
            <div className="content-container">
                <div className="content">
                    <div className="card">
                        <h2>Card Title</h2>
                        <p>Card content goes here.</p>
                    </div>
                    <div className="card">
                        <h2>Card Title</h2>
                        <p>Card content goes here.</p>
                    </div>
                    <div className="card">
                        <h2>Card Title</h2>
                        <p>Card content goes here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;