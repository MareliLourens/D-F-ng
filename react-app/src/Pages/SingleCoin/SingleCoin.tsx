import React, { useState } from 'react';
import styles from './SingleCoin.module.css';
import { Chart } from 'react-chartjs-2';
import NavBar from '../../components/navBar/NavBar';
import NavHeader from '../../components/navHeader/navHeader';
import { FaArrowRight, FaMoneyBillTransfer } from 'react-icons/fa6';
import Buy from '../../components/buy/Buy';
import Sell from '../../components/sell/Sell';
import Coin from '../../assets/coin.png';

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

          <div className='btn-main'>
            <div className="chart-container">
              <div className="chart-text">
                <p style={{fontSize: '23.75px'}}>Star Coin</p>
                <p style={{fontSize: '63px'}}>15,2%</p>
                <p style={{fontSize: '23px', color: 'green'}}>+2.3%</p>
              </div>
              <Chart
                type="line"
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                  datasets: [{
                    label: "Price",
                    data: [100, 120, 140, 160, 180, 200, 220],
                    backgroundColor: "rgba(155, 89, 182, 0.2)",
                    borderColor: "#9B59B6",
                    borderWidth: 2,
                  }]
                }}
                options={{
                  scales: { y: { beginAtZero: true } },
                  plugins: {
                    legend: { display: true },
                    tooltip: {
                      titleFont: { family: 'Open Sans', size: 12 },
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      titleColor: 'red',
                    },
                  },
                  elements: {
                    line: { tension: 0.4, borderColor: "#9B59B6", borderWidth: 2 },
                    point: { backgroundColor: 'white' },
                  },
                }}
                height={100}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div className='btn-main'>
              <div className="spinning-coin" style={{ display: 'flex', alignItems: 'center' }}>
                <img style={{ width: '200px' }} src={Coin} alt="Spinning Coin" />
                <p style={{ marginLeft: '10px' }}>StarCoin is a fast, decentralized cryptocurrency designed for low-cost transactions and smart contracts, aiming to power global digital exchanges and innovative DeFi projects.</p>
              </div>
            </div>
            
            <div className='btn-main'>
              <ul style={{ lineHeight: '2' }}>
                <li>Market Cap Rank: #25 (hypothetical)</li>
                <li>Current Price: $0.75 (hypothetical)</li>
                <li>Market Capitalization: $1.5 billion (hypothetical)</li>
                <li>Circulating Supply: 2 billion STC</li>
                <li>Total Supply: 5 billion STC</li>
              </ul>
            </div>
          </div>

        </div>

        <div className={`${styles.gap} body-container--right`}>
          <div className={styles.buttonContainer}>
            <Buy />
            <Sell />
          </div>
          <div className='line'></div>
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
      <div className='btn-main' style={{ width: '66.5%', marginLeft: '20px', padding: '20px' }}>
        <p>Trading Advantages:</p>
        <ul style={{ lineHeight: '2' }}>
          <li>Offers significantly lower fees compared to major cryptocurrencies like Bitcoin and Ethereum.</li>
          <li>Processes transactions in under 2 seconds, ensuring quick payments and confirmations.</li>
          <li>Built on a scalable blockchain platform, accommodating increasing transaction volumes without compromising performance.</li>
        </ul>
      </div>
      <NavBar />
    </div>
  );
};

export default SingleCoin;