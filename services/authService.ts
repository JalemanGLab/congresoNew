import axiosInstance from './axios';
// import { secureStorage } from './encryption'; // Ya no necesitamos la encriptación

export interface User {
    id: string;
    email: string;
    name?: string;
    first_name?: string;
    last_name?: string;
    role: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    status: boolean;
    message: string;
    data: {
        token: string;
        user: User;
    };
}

export interface AuthError {
    message: string;
    error: string;
    statusCode: number;
}

export const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            const response = await axiosInstance.post<AuthResponse>('auth/login', credentials);
            
            if (response.data.status && response.data.data) {
                localStorage.setItem('token', response.data.data.token);
                
                if (response.data.data.user) {
                    localStorage.setItem('user', JSON.stringify(response.data.data.user));
                }
                return response.data;
            } else {
                throw new Error('Formato de respuesta inválido');
            }
        } catch (error: any) {
            // Si es un error de Axios con respuesta del servidor
            if (error.response) {
                const errorData = error.response.data;
                throw {
                    message: errorData.message || 'Error de autenticación',
                    error: errorData.error || 'Error desconocido',
                    statusCode: error.response.status
                };
            }
            // Si es un error de red
            if (error.request) {
                throw {
                    message: 'No se pudo conectar con el servidor',
                    error: 'NetworkError',
                    statusCode: 0
                };
            }
            // Cualquier otro tipo de error
            throw {
                message: error.message || 'Error inesperado',
                error: 'UnknownError',
                statusCode: 500
            };
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    },

    isAuthenticated: (): boolean => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        return !!(token && user);
    },

    getCurrentUser: (): User | null => {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) return null;
            return JSON.parse(userStr);
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            return null;
        }
    }
}; 