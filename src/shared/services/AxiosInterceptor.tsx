import axios from "axios";

const AxiosInterceptor = axios.create({
    baseURL: 'http://127.0.0.1:5432',
    headers: {
        'Content-Type': 'application/json',
    },
});

const pendingRequests = new Map();

AxiosInterceptor.interceptors.request.use((config) => {
    if(config.method === 'get'){
        const requestKey = `${config.method}_${config.url}`;
        if (pendingRequests.has(requestKey)) {
            const controller = pendingRequests.get(requestKey);
            controller.abort();
            pendingRequests.delete(requestKey);
        }

        const controller = new AbortController();
        config.signal = controller.signal;
        pendingRequests.set(requestKey, controller);
    }

    const token = sessionStorage.getItem('au');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

AxiosInterceptor.interceptors.response.use(
    (response) => {
        const requestKey = `${response.config.method}_${response.config.url}`;
        pendingRequests.delete(requestKey);

        const newToken = response.headers['authorization'];
        if (newToken && newToken.startsWith('Bearer ')) {
            sessionStorage.setItem('au', newToken);
        }    
        return response;
    },
    (error) => {
        if (error.config) {
            const requestKey = `${error.config.method}_${error.config.url}`;
            pendingRequests.delete(requestKey);
        }

        if (axios.isCancel(error)) {
            return new Promise(() => {});
        }

        if (error.response?.status === 401) {
            sessionStorage.removeItem('au');
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default AxiosInterceptor;