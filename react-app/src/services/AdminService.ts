import axios from 'axios';

export interface User {
  userId: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

const API_BASE_URL = 'http://localhost:5234/api';

export const useAdminService = () => {
  const getAllUsers = async (): Promise<User[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/User`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  return {
    getAllUsers,
  };
};

export default useAdminService;