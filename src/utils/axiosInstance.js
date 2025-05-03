import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true, // Sends cookies with requests
});

// Request interceptor: Attach token (if available) to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Or from a global state/context
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors like unauthorized (401)
    if (error.response && error.response.status === 401) {
      // Optionally logout the user or redirect to login page
      console.log('Unauthorized, please login again');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
