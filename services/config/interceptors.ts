import axiosInstance from './axios';
import { useAuthStore } from '@/store/authStore';

// Interceptor para añadir el token a las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas y errores
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || 
        error.response?.data?.error === 'TOKEN_EXPIRED' ||
        error.response?.data?.error === 'INVALID_TOKEN') {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 