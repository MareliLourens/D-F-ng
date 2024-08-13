import React from 'react';
import './Main.css';
import Navbar from '../components/navbar';

const Main = () => {
    return (
        <div className="main-container">
            <Navbar />
          
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