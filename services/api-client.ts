import axios from 'axios';

const API_BASE = process.env.SERVICES_API_BASE;

const axiosApi = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});

export default axiosApi;
