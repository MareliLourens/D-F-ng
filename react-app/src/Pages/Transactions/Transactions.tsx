import React from 'react';
import './Transactions.css';

import NavBar from '../../components/navBar/NavBar';
import NavHeader from '../../components/navHeader/navHeader';

function Transactions() {
  return (

    <div>
      <div className="body-main">
        <NavHeader></NavHeader>
        <div className="body-container">
          <div className="trasnaction-table-container dark-bg--gradient">
            <div className="trasnaction-table-header">
              <div className="trasnaction-table-heading">
                <h1 className="h3">Name</h1>
              </div>
              <div className="trasnaction-table-heading">
                <h1 className="h3">Date</h1>
              </div>
              <div className="trasnaction-table-heading">
                <h1 className="h3">Amount</h1>
              </div>
              <div className="trasnaction-table-heading">
                <h1 className="h3">invoice id</h1>
              </div>
              <div className="trasnaction-table-heading">
                <h1 className="h3">Status</h1>
              </div>
              <div className="trasnaction-table-heading">
                <h1 className="h3"><></></h1>
              </div>
            </div>
            <div className="line"></div>
            <div className="trasnaction-table-header">
              <div className="trasnaction-table-heading">
                {/* check styling */}
                <div className="nav-header--profile">
                  <img src="https://images.unsplash.com/photo-1707928373566-6a8ac1308d9a?q=80&w=1546&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" className="profile-photo" />
                  <div className="profile-name">Luca Breebaart</div>
                </div>
              </div>
              <div className="trasnaction-table-heading">
                <h1 className="h3">12/04/2024</h1>
              </div>
              <div className="trasnaction-table-heading">
                <h1 className="h3">+R1500</h1>
              </div>
              <div className="trasnaction-table-heading">
                <h1 className="h3">123456</h1>
              </div>
              <div className="trasnaction-table-heading">
                <h1 className="h3">Recieved</h1>
              </div>
              <div className="trasnaction-table-heading">
                <button className="h4 tertiary-btn">view more</button>
              </div>
            </div>
          </div>
        </div>
        <NavBar></NavBar>
      </div>
    </div>
  );
}

export default Transactions;
