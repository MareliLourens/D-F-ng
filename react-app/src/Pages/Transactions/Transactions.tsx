import React, { useState, useEffect } from 'react';
import './Transactions.css';

import NavBar from '../../components/navBar/NavBar';
import NavHeader from '../../components/navHeader/navHeader';
import useTransactionService, { Transaction } from '../../services/TransactionService';
import useUserService from '../../services/UserService';
import Loading from '../../components/loading'; // Import the new Loading component

function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const transactionService = useTransactionService();
  const userService = useUserService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await userService.getCurrentUser();
        const userTransactions = await transactionService.getTransactionsForUser(user.userId);
        setTransactions(userTransactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatAmount = (amount: number, transactionType: string) => {
    const prefix = transactionType === 'AccountTopup' ? '+' : '-';
    return `${prefix}R${amount.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="loading-wrapper">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="body-main">
        <NavHeader />
        <div className="body-container">
          <div className="trasnaction-table-container dark-bg--gradient">
            <div className="trasnaction-table-header">
              <div className="trasnaction-table-heading">
                <h1 className="h3">Type</h1>
              </div>
              <div className="trasnaction-table-heading">
                <h1 className="h3">Date</h1>
              </div>
              <div className="trasnaction-table-heading">
                <h1 className="h3">Amount</h1>
              </div>
              <div className="trasnaction-table-heading">
                <h1 className="h3">From</h1>
              </div>
              <div className="trasnaction-table-heading">
                <h1 className="h3">To</h1>
              </div>
            </div>
            <div className="line"></div>
            {transactions.map((transaction) => (
              <div key={transaction.transactionId} className="trasnaction-table-header">
                <div className="trasnaction-table-heading">
                  <h1 className="h3">{transaction.transactionType}</h1>
                </div>
                <div className="trasnaction-table-heading">
                  <h1 className="h3">{formatDate(transaction.timestamp)}</h1>
                </div>
                <div className="trasnaction-table-heading">
                  <h1 className="h3">{formatAmount(transaction.amount, transaction.transactionType)}</h1>
                </div>
                <div className="trasnaction-table-heading">
                  <h1 className="h3">{transaction.fromUsername || transaction.fromAccountId}</h1>
                </div>
                <div className="trasnaction-table-heading">
                  <h1 className="h3">{transaction.toUsername || transaction.toAccountId}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        <NavBar />
      </div>
    </div>
  );
}

export default Transactions;