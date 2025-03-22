import axiosInstance from './axios';
import { secureStorage } from './encryption';
import { handleAxiosError } from './axios';

// Interfaces
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
}

export interface AuthError {
    message: string;
    status: number;
}

// Servicio de autenticación
export const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            // Aseguramos que la URL sea correcta
            const response = await axiosInstance.post('auth/login', credentials);
            
            if (response.data.token) {
                // Guardamos los tokens de forma segura
                secureStorage.setItem('token', response.data.token);
                secureStorage.setItem('refreshToken', response.data.refreshToken);
                secureStorage.setItem('user', JSON.stringify(response.data.user));
            }
            
            return response.data;
        } catch (error) {
            console.error('Error en login:', error);
            const axiosError = handleAxiosError(error);
            throw {
                message: axiosError.message,
                status: axiosError.status
            };
        }
    },

    logout: async () => {
        try {
            // Llamamos al endpoint de logout
            await axiosInstance.post('auth/logout');
        } catch (error) {
            console.error('Error al cerrar sesión en el servidor:', error);
        } finally {
            // Siempre limpiamos el almacenamiento local y redirigimos
            secureStorage.removeItem('token');
            secureStorage.removeItem('refreshToken');
            secureStorage.removeItem('user');
            window.location.href = '/login';
        }
    },

    isAuthenticated: (): boolean => {
        return !!secureStorage.getItem('token');
    },

    getCurrentUser: () => {
        const userStr = secureStorage.getItem('user');
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    }
}; 