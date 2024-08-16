import React, { useState } from 'react';
import styles from './SingleCoin.module.css';

import NavBar from '../../components/navBar/NavBar';
import NavHeader from '../../components/navHeader/navHeader';
import { FaArrowRight, FaMoneyBill, FaMoneyBills, FaMoneyBillTransfer } from 'react-icons/fa6';
import Buy from '../../components/buy/Buy';
import Sell from '../../components/sell/Sell';

const SingleCoin = () => {

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ input1: '', input2: '', input3: '' });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="body-main">
      <NavHeader />
      <div className="body-container">
        <div className="body-container--left">

          {/* CS, add your code here */}

        </div>
        <div className={`${styles.gap} body-container--right`}>
          <div className={styles.buttonContainer}>
            <Buy></Buy>
            <Sell></Sell>
          </div>
          <div className='line'></div>
          {/* Trade */}
          <div className={styles.buttonContainer}>
            <div className="btn-main dark-bg--gradient shine-hover">
              <FaMoneyBillTransfer className='money-svg-bg' />
              <div>
                <FaMoneyBillTransfer className='money-svg' />
              </div>
              <div className="btn-main-container">
                <div className="h2">TRADE</div>
                <div>
                  <FaArrowRight className="svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default SingleCoin;

