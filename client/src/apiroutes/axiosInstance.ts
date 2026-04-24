import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_URL + '/api',
});

// Helper to check if JWT is expired locally
const isTokenExpired = (token: string) => {
    if (!token) return true;
    const parts = token.split('.');
    if (parts.length !== 3) return false; // Assume mock tokens are not expired
    
    try {
        const payload = JSON.parse(atob(parts[1]));
        if (!payload.exp) return false;
        // Check if current time is past expiration
        return payload.exp * 1000 < Date.now();
    } catch (e) {
        return true;
    }
};

const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
};

// Add auth tokens & Cache Management
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        
        // Proactive token validation
        if (token && isTokenExpired(token)) {
            clearAuthData();
            if (window.location.pathname !== '/') {
                window.location.href = '/';
                return Promise.reject(new Error('Token expired'));
            }
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Prevent browser caching for authentication requests
        const isAuthRequest = config.url.includes('/login') || config.url.includes('/me');
        if (isAuthRequest) {
            config.params = { ...config.params, _t: Date.now() };
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Handle 401/403 errors (Token expired or invalid)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && window.location.pathname !== '/') {
            clearAuthData();
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export { API_URL, clearAuthData };
export default axiosInstance;
