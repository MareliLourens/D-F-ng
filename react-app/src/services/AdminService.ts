import axios from 'axios';

export interface AdminUser {
  userId: number;
  username: string;
  email: string;
  isAdmin: boolean;
}

const API_BASE_URL = 'http://localhost:5234/api';

export const useAdminService = () => {
  const getAllUsers = async (): Promise<AdminUser[]> => {
    try {
      const response = await axios.get<AdminUser[]>(`${API_BASE_URL}/User`);
      // added AdminUser[] because we are aware of the array structure
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