import axios from 'axios';
import { Platform } from 'react-native';

// Выносим IP с проверкой на Android/iOS, как у вас в config.ts
export const API_BASE_URL = Platform.OS === 'android'
  ? 'http://10.0.2.2:5272'
  : 'http://localhost:5272';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    // const token = await getToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;