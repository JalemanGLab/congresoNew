import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { secureStorage } from './encryption';

// Extendemos la configuración de Axios para incluir _retry
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

// Creamos una instancia de axios con la configuración base
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Interceptor para las peticiones
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Obtenemos el token del localStorage de forma segura
        const token = secureStorage.getItem('token');
        
        // Si existe un token, lo añadimos a los headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Aseguramos que los headers CORS estén presentes
        config.headers['Access-Control-Allow-Origin'] = process.env.NEXT_PUBLIC_API_URL;
        config.headers['Access-Control-Allow-Credentials'] = 'true';
        
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Interceptor para las respuestas
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        if (!error.config) {
            return Promise.reject(error);
        }

        const originalRequest = error.config as ExtendedAxiosRequestConfig;

        // Si el error es 401 (Unauthorized) y no hemos intentado renovar el token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Intentamos renovar el token
                const refreshToken = secureStorage.getItem('refreshToken');
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
                    refreshToken
                });

                const { token } = response.data;

                // Guardamos el nuevo token de forma segura
                secureStorage.setItem('token', token);

                // Actualizamos el header con el nuevo token
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                }

                // Reintentamos la petición original con el nuevo token
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Si falla la renovación del token, redirigimos al login
                secureStorage.removeItem('token');
                secureStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Función para manejar errores común
export const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        // Error de red o servidor
        if (error.response) {
            return {
                message: error.response.data.message || 'Error en el servidor',
                status: error.response.status
            };
        } else if (error.request) {
            // Error de conexión
            return {
                message: 'No se pudo conectar con el servidor',
                status: 0
            };
        }
    }
    // Error general
    return {
        message: 'Ocurrió un error inesperado',
        status: 500
    };
};

export default axiosInstance; 