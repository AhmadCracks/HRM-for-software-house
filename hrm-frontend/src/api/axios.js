import axios from 'axios';

// Get API URL from environment variable
// CRITICAL: In production (Vercel), VITE_API_URL MUST be set in Vercel environment variables
// Fallback to the verified backend URL if evn var is missing in production
const PROD_BACKEND = 'https://hrm-for-software-house2.vercel.app/api';
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'production' ? PROD_BACKEND : 'http://localhost:5000/api');

// Warn if using localhost in production
if (import.meta.env.MODE === 'production' && API_URL.includes('localhost')) {
  console.error('❌ ERROR: VITE_API_URL environment variable is not set in Vercel!');
  console.error('❌ Frontend is trying to connect to localhost instead of Vercel backend.');
  console.error('📝 Fix: Add VITE_API_URL=https://hrm-for-software-house2.vercel.app/api in Vercel Dashboard');
}

// Log API URL for debugging
console.log('🔗 API URL:', API_URL);
console.log('🔗 Environment:', import.meta.env.MODE);
console.log('🔗 VITE_API_URL set:', !!import.meta.env.VITE_API_URL);

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
