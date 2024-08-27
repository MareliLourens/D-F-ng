import React, { useEffect, useState } from 'react';
import styles from './sell.module.css';

import { FaArrowRight, FaMoneyBill } from 'react-icons/fa6';
import axios from 'axios';

const Sell = () => {

  const [showModal, setShowModal] = useState(false);
  const [amountEnteredToSell, setAmountEnteredToSell] = useState(1); //Starcoin Amount To Sell
  const [transFee, setTransFee] = useState(25); //Transaction fee
  const [totalGain, setTotalGain] = useState(275); //Total Cost

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // User Info
  const [userId, setUserId] = useState('');
  const [accountCoins, setAccountCoins] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchAccountData = async () => {

      if (userId) {
        try {

          const response = await axios.get(`http://localhost:5234/api/Account/${userId}`);
          setAccountCoins(response.data.CoinBalance);
          setAccountBalance(response.data.balance);

        } catch (error) {

          console.error('Error fetching account data:', error);

        }
      }

    };

    fetchAccountData();
  }, [userId]);

  const handleSell = async () => {
    if (amountEnteredToSell > accountCoins) {

      console.log(amountEnteredToSell);
      console.log(accountCoins);

      alert('You do not have enough funds to complete this purchase.');
      return;

    } else {
      try {

        const response = await axios.post('http://localhost:5234/api/Transaction/StarCoinPurchase', null, {
          params: {
            fromAccountId: userId, // The user ID
            starCoins: -amountEnteredToSell, // The amount of StarCoins the user wants to sell
            amount: totalGain // The total cost in currency to be added
          }
        });

        if (response.status === 201) {
          alert('StarCoin(s) successfully sold!');
          setAccountBalance(accountBalance + totalGain); // Update the local balance
          handleClose(); // Close the modal
        }

      } catch (error) {
        console.error('Error selling StarCoins:', error);
        alert('There was an error processing your purchase.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);

    setAmountEnteredToSell(value);
    const preCost = value * 250;
    const fee = preCost * 0.1;

    setTransFee(fee);
    setTotalGain(preCost - fee);
  };

  return (
    <div className={styles.bodyButtonContainer}>

      <div className={styles.buttonContainer}>
        <div className="btn-main dark-bg--gradient shine-hover" onClick={handleShow}>
          <FaMoneyBill className='money-svg-bg' />
          <div>
            <FaMoneyBill className='money-svg' />
          </div>
          <div className="btn-main-container">
            <div className="h2">SELL</div>
            <div>
              <FaArrowRight className="svg" />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div className={styles.modalOverlay} onClick={handleClose}></div>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h5 className={styles.modalTitle}>SELL</h5>
              <button className={styles.closeButton} onClick={handleClose}>&times;</button>
            </div>
            <div className={styles.modalBody}>
              {/*  */}
              <div className='transactions-container dark-bg--gradient'>
                <p className={styles.titles}>StarCoin Amount To Sell:</p>
                <input
                  type="number"
                  name="input1"
                  value={amountEnteredToSell}
                  onChange={handleChange}
                  className={styles.input}
                  min={1}
                />

                {/* TODO: Implement transaction fees from account status */}
                <p className={styles.titles}>Transaction Fee (In Rands):</p>
                <div className={styles.input} id='transFee'>
                  {transFee}
                </div>

                <hr style={{ width: '100%', margin: '0px' }}></hr>

                <p className={styles.titles}>Total Gain (In Rands):</p>
                <div className={styles.input}>
                  {totalGain}
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={`${styles.closeButton} tertiary-btn`} onClick={handleClose}>
                Close
              </button>
              <button className={`${styles.continueButton} btn-main `} onClick={handleSell}>
                Submit
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sell;