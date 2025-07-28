import axios from 'axios';

// Create a common axios instance
export const httpClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Add any common request logic here (e.g., auth tokens)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error scenarios
    if (error.response) {
      // Server responded with error status
      const apiError = {
        message: error.response.data?.error || error.response.data?.message || 'An error occurred',
        status: error.response.status,
        code: error.response.data?.code,
      };
      return Promise.reject(apiError);
    } else if (error.request) {
      // Network error
      const apiError = {
        message: 'Network error. Please check your connection.',
        status: 0,
        code: 'NETWORK_ERROR',
      };
      return Promise.reject(apiError);
    } else {
      // Other error
      const apiError = {
        message: error.message || 'An unexpected error occurred',
        status: 0,
        code: 'UNKNOWN_ERROR',
      };
      return Promise.reject(apiError);
    }
  }
); 