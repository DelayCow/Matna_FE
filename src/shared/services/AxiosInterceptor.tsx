import axios from "axios";

const AxiosInterceptor = axios.create({
    baseURL: 'http://127.0.0.1:5432', 
    headers: {
        'Content-Type' : 'application/json', // 요청 형식임
    },
})

AxiosInterceptor.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('au');
    if (token){
        config.headers.Authorization = token;
    }
    return config;
})

AxiosInterceptor.interceptors.response.use(
    (response) => {
    const newToken = response.headers['authorization'];
    
    if (newToken && newToken.startsWith('Bearer ')) {
            sessionStorage.setItem('au', newToken);
        }    
    return response;
    },(error) => {
        if (error.response?.status === 401) {
            sessionStorage.removeItem('au');
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    })

export default AxiosInterceptor;