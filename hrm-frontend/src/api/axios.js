import axios from 'axios';

// Get API URL from environment variable
// In production (Vercel), this MUST be set in environment variables
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production'
    ? 'https://hrm-backend-xxx.vercel.app/api' // Fallback - should use env var
    : 'http://localhost:5000/api'); // Development

// Log API URL for debugging (only in development)
if (import.meta.env.DEV) {
  console.log('🔗 API URL:', API_URL);
  console.log('🔗 VITE_API_URL env:', import.meta.env.VITE_API_URL);
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

