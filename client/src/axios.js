import axios from 'axios';
const axiosBaseUrl = axios.create({baseURL: 'http://localhost:5000'});

axiosBaseUrl.interceptors.request.use((config)=> {
    config.headers.Authorization = window.localStorage.getItem("token");

    return config;
})

export default axiosBaseUrl