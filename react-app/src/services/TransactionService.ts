import axios from 'axios';

const API_BASE_URL = 'http://localhost:5234/api';

export interface Transaction {
  transactionId: number;
  transactionType: string;
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  timestamp: string;
  fromUsername?: string;
  toUsername?: string;
}

interface ApiResponse {
  $id: string;
  $values: Transaction[];
}

export const useTransactionService = () => {
  const getTransactionsForAccount = async (accountId: number): Promise<Transaction[]> => {
    try {
      // Fetch all transactions
      const response = await axios.get<ApiResponse>(`${API_BASE_URL}/Transaction`);
      const transactions: Transaction[] = response.data.$values;

      // Filter transactions for the current account
      const accountTransactions = transactions.filter(
        t => t.fromAccountId === accountId || t.toAccountId === accountId
      );

      // Fetch usernames for involved accounts
      const uniqueAccountIds = new Set([
        ...accountTransactions.map(t => t.fromAccountId),
        ...accountTransactions.map(t => t.toAccountId)
      ]);

      const accountPromises = Array.from(uniqueAccountIds).map(id =>
        axios.get(`${API_BASE_URL}/Account/${id}`)
      );

      const accounts = await Promise.all(accountPromises);
      const accountMap = new Map(accounts.map(a => [a.data.accountId, a.data.userId]));

      const userPromises = Array.from(new Set(accounts.map(a => a.data.userId))).map(id =>
        axios.get(`${API_BASE_URL}/User/${id}`)
      );

      const users = await Promise.all(userPromises);
      const userMap = new Map(users.map(u => [u.data.userId, u.data.username]));

      // Add usernames to transactions
      return accountTransactions
        .map(t => ({
          ...t,
          fromUsername: userMap.get(accountMap.get(t.fromAccountId) || 0),
          toUsername: userMap.get(accountMap.get(t.toAccountId) || 0)
        }))
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  };

  return {
    getTransactionsForAccount,
  };
};

export default useTransactionService;