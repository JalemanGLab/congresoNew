import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const handleAxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.data || {
      message: error.message,
      error: 'Error de conexión',
      statusCode: error.response?.status || 500
    };
  }
  return {
    message: 'Error inesperado',
    error: 'Error desconocido',
    statusCode: 500
  };
};

export default axiosInstance; 