import axios from 'axios';
export const clientApi = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,  
    headers: {
        'Content-Type': 'application/json'
    }
});

clientApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Nova_Token'); 
        config.headers = config.headers || {};
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        } 
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);