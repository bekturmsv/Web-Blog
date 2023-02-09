import axios from 'axios';
const axiosBaseUrl = axios.create({baseURL: process.env.REACT_APP_API_URL});

axiosBaseUrl.interceptors.request.use((config)=> {
    config.headers.Authorization = window.localStorage.getItem("token");

    return config;
})

export default axiosBaseUrl