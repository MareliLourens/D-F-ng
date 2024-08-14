import axios, { AxiosError } from 'axios';

// API URL configuration
const API_URL = "http://localhost:5234/api/User/";
const API_URL_LOGIN = "http://localhost:5234/api/Auth/";

// Define response interfaces
interface RegisterResponse {
    result: string; // Adjust based on actual response structure
}

interface LoginResponse {
    UserId: string;
    Token: string;
}

// Define the error structure for unauthorized responses
interface UnauthorizedError {
    Message: string;
}

// Register function
const register = async (username: string, email: string, password: string): Promise<RegisterResponse> => {
    try {
        const response = await axios.post<RegisterResponse>(`${API_URL}`, {
            username,
            email,
            password
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                // Server responded with a status other than 2xx
                console.error('Registration error response:', axiosError.response.data);
                console.error('Status code:', axiosError.response.status);
            } else if (axiosError.request) {
                // Request was made but no response was received
                console.error('No response received:', axiosError.request);
            } else {
                // Something happened in setting up the request
                console.error('Error setting up request:', axiosError.message);
            }
        } else {
            // Handle non-Axios errors
            console.error('Unexpected error:', error);
        }
        throw error; // Re-throw the error after logging
    }
};

// Login function
const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_URL_LOGIN}login`, {
            username,
            password
        });

        if (response.data.Token) {
            localStorage.setItem("user", JSON.stringify(response.data)); // Storing the user information in local storage
            localStorage.setItem('token', response.data.Token); // Storing the token separately
            console.log('Login successful');
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                // Cast response data to expected error structure
                const errorData = axiosError.response.data as UnauthorizedError;

                console.error('Login error response:', axiosError.response.data);
                console.error('Status code:', axiosError.response.status);
               
                // Handle specific message for unauthorized response
                if (axiosError.response.status === 401 && errorData.Message) {
                    console.error('Error message:', errorData.Message);
                }
            } else if (axiosError.request) {
                console.error('No response received:', axiosError.request);
            } else {
                console.error('Error setting up request:', axiosError.message);
            }
        } else {
            console.error('Unexpected error:', error);
        }
        throw error; // Re-throw the error after logging
    }
};

// Logout function
const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};

// Export the functions
export default {
    register,
    login,
    logout
};

