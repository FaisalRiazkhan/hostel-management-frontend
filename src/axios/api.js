// axios.js or api.js

import axios from 'axios';

// Set base URL for your Laravel API
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

// Include authentication token in request headers
const token = localStorage.getItem('authToken'); // Assuming you stored the token in local storage
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Add a request interceptor to handle errors
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        // Handle unauthorized access (e.g., redirect to login page)
        // Example: router.push('/login');
    }
    return Promise.reject(error);
});

export default axios;
