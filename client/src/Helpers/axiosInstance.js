import axios from "axios";


const BaseUrl = 'http://localhost:5000/api/v1';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BaseUrl;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;















