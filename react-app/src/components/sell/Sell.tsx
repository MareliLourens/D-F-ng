import React, { useState } from 'react';
import styles from './sell.module.css';

import { FaArrowRight, FaMoneyBill } from 'react-icons/fa6';

const Sell = () => {

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ input1: '', input2: '', input3: '' });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
                <input
                  type="text"
                  placeholder="how much"
                  name="input1"
                  value={formData.input1}
                  onChange={handleChange}
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="what coin"
                  name="input2"
                  value={formData.input2}
                  onChange={handleChange}
                  className={styles.input}
                />
                <div className={styles.input}>
                  how much you will get
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={`${styles.closeButton} tertiary-btn`} onClick={handleClose}>
                Close
              </button>
              <button className={`${styles.continueButton} btn-main `} onClick={handleClose}>
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

