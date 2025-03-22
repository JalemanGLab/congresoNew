import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token a las peticiones
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Error en la petición:', error);
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // El servidor respondió con un código de error
            // console.error(`Error del servidor - Status: ${error.response.status}`);
            // console.error('Mensaje:', error.response.data.message);
            // console.error('Detalles:', JSON.stringify(error.response.data, null, 2));
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            console.error('Error de red - No hubo respuesta del servidor');
            console.error('Detalles de la petición:', error.request);
        } else {
            // Error al configurar la petición
            console.error('Error de configuración:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
