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

export const registerQr = async (id: string) => {
    try {
        // Token JWT fijo para autenticación
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2NzEsInJvbGUiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzQyNjY1NDM5LCJleHAiOjE3NDI3NTE4Mzl9.3PHmqAR2CcdZIwMhHU6kzDmoYUfv_wCrayrui4MEz_4";
        
        // Usa la ruta relativa ya que baseURL ya está configurado
        const response = await axiosInstance.patch(`/assistants/register-entry/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        // Usa la función de manejo de errores existente
        const errorInfo = handleAxiosError(error);
        return {
            success: false,
            message: errorInfo.message
        };
    }
}

export default axiosInstance;
