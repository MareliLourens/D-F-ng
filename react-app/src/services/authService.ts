// authService.ts
export interface SignUpData {
    username: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    userId: string;
    isAdmin: boolean;
}

export interface OtpValidationData {
    email: string;
    otp: string;
}

export interface AccountData {
    accountId: number;
    // ... other account properties
}

export const useAuthService = () => {
    const apiUrl = 'http://localhost:5234/api/AuthControllerOTP';

    const signUp = async (data: SignUpData) => {
        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Sign up failed');
        }

        return response.json();
    };

    const login = async (data: LoginData): Promise<LoginResponse> => {
        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return response.json();
    };

    const getAccountData = async (userId: string): Promise<AccountData> => {
        const response = await fetch(`http://localhost:5234/api/Account/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch account data');
        }

        return response.json();
    };

    const validateOtp = async (data: OtpValidationData) => {
        const response = await fetch(`${apiUrl}/validate-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('OTP validation failed');
        }

        return response.json();
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('accountId');
    };

    return {
        signUp,
        login,
        validateOtp,
        logout,
        getAccountData,
    };
};

export default useAuthService;