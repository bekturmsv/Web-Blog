import axios from 'axios';
const axiosBaseUrl = axios.create({baseURL: 'http://localhost:5000'});
export default axiosBaseUrl