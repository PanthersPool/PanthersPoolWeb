import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Update this with your actual API URL

export const authService = {
    async login(email, password) {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Login failed' };
        }
    },

    async signup(userData) {
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, userData);
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Signup failed' };
        }
    },

    logout() {
        localStorage.removeItem('user');
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}; 