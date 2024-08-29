import React, { useEffect, useState } from 'react';
import styles from './buy.module.css';

import { FaArrowRight, FaMoneyBills } from 'react-icons/fa6';
import axios from 'axios';

const Buy = () => {

  const [showModal, setShowModal] = useState(false);
  const [amountEntered, setAmountEntered] = useState(1); //Starcoin Amount
  const [transFee, setTransFee] = useState(25); //Transaction fee
  const [transFeePerc, setTransFeePerc] = useState(1); //Transaction fee %
  const [totalCost, setTotalCost] = useState(275); //Total Cost
  const [cashAmount, setCashAmount] = useState(200); //Cost before totalcost

  const [transType, setTransType] = useState('StarCoins')

  // User Info
  const [userId, setUserId] = useState('');
  const [accountBalance, setAccountBalance] = useState(0);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

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
          setAccountBalance(response.data.balance);

          const accountStatus = response.data.statusId;
          const responseStatus = await axios.get(`http://localhost:5234/api/Status/${accountStatus}`)
          const statusTransFee = responseStatus.data.transactionFee;

          setTransFeePerc(statusTransFee);

        } catch (error) {
          console.error('Error fetching account data:', error);
        }
      }

    };

    fetchAccountData();
  }, [userId]);

  const handlePurchase = async () => {
    if (totalCost > accountBalance) {

      alert('You do not have enough funds to complete this purchase.');
      return;

    } else {
      try {

        console.log(amountEntered);

        const response = await axios.post('http://localhost:5234/api/Transaction/StarCoinPurchase', null, {
          params: {
            fromAccountId: userId, // The user ID
            starCoins: amountEntered, // The amount of StarCoins the user wants to purchase
            amount: -totalCost // The total cost in currency to be deducted
          }
        });

        if (response.status === 201) {
          alert('StarCoin purchase successful!');
          setAccountBalance(accountBalance - totalCost); // Update the local balance
          handleClose(); // Close the modal
        }

      } catch (error) {
        console.error('Error purchasing StarCoins:', error);
        alert('There was an error processing your purchase.');
      }
    }
  };

  const handleTopup = async () => {
    try {
      const response = await axios.post('http://localhost:5234/api/Transaction/AccountTopup', null, {
        params: {
          fromAccountId: userId, // The user ID
          amount: cashAmount // The amount of money to top up
        }
      });

      if (response.status === 201) {
        alert('Account top-up successful!');
        setAccountBalance(accountBalance + cashAmount); // Update the local balance
        handleClose(); // Close the modal
      }

    } catch (error) {
      console.error('Error topping up account:', error);
      alert('There was an error processing your top-up.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);

    setAmountEntered(value);
    const preCost = value * 250;
    const fee = preCost * transFeePerc;

    setTransFee(fee)
    setTotalCost(preCost + fee)
  };

  const handleChangeTopup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);

    setCashAmount(value);
  };

  return (
    <div className={styles.bodyButtonContainer}>
      <div className={styles.buttonContainer}>
        <div className="btn-main dark-bg--gradient shine-hover" onClick={handleShow}>
          <FaMoneyBills className='money-svg-bg' />
          <div>
            <FaMoneyBills className='money-svg' />
          </div>
          <div className="btn-main-container">
            <div className="h2">BUY</div>
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
              <h5 className={styles.modalTitle}>BUY</h5>

              <select
                value={transType}
                onChange={(e) => setTransType(e.target.value)}
                className={styles.dropdown}
              >
                <option className='dropdownOptions' value="StarCoins">StarCoins</option>
                <option value="AccountTopup">Account Top-up</option>
              </select>

              <button className={styles.closeButton} onClick={handleClose}>&times;</button>
            </div>
            <div className={styles.modalBody}>
              {/*  */}
              <div className='transactions-container dark-bg--gradient'>
                {transType === 'StarCoins' ? (
                  <>
                    <p className={styles.titles}>StarCoin Amount:</p>
                    <input
                      type="number"
                      name="input1"
                      value={amountEntered}
                      onChange={handleChange}
                      className={styles.input}
                      min={1}
                    />

                    <p className={styles.titles}>Transaction Fee (In Rands):</p>
                    <div className={styles.input} id='transFee'>
                      {transFee}
                    </div>

                    <hr style={{ width: '100%', margin: '0px' }}></hr>

                    <p className={styles.titles}>Total Cost (In Rands):</p>
                    <div className={styles.input}>
                      {totalCost}
                    </div>
                  </>
                ) : transType === 'AccountTopup' ? (
                  <>
                    <p className={styles.titles}> Top-Up Amount (In Rands):</p>
                    <input
                      type="number"
                      name="input2"
                      value={cashAmount}
                      onChange={handleChangeTopup}
                      className={styles.input}
                      min={200}
                    />

                    <hr style={{ width: '100%', margin: '0px' }}></hr>

                    <p className={styles.titles}>Card Number:</p>
                    <input
                      type="text"
                      name="input3"
                      placeholder='0000 0000 0000 0000'
                      className={styles.input}
                    />

                    <p className={styles.titles}>CVV Number:</p>
                    <input
                      type="text"
                      name="input4"
                      placeholder='0000'
                      className={styles.input}
                    />
                  </>
                ) : null}
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={`${styles.closeButton} tertiary-btn`} onClick={handleClose}>
                Close
              </button>

              {transType === 'StarCoins' ? (
                <button className={`${styles.continueButton} btn-main `} onClick={handlePurchase}>
                  Submit
                </button>
              ) : transType === 'AccountTopup' ? (
                <button className={`${styles.continueButton} btn-main `} onClick={handleTopup}>
                  Submit
                </button>
              ) : null}

            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Buy;