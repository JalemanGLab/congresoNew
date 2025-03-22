import axiosInstance from './axios';

// Interfaces
export interface User {
    identification: string;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    role: string;
    token?: string;
    otp?: string;
    otp_expired?: boolean;
    created_at: string;
    is_active: boolean;
}

export interface GetUsersResponse {
    users: User[];
    total: number;
    page: number;
    limit: number;
}

export interface GetUsersParams {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    is_active?: boolean;
}

// Servicios
export const userService = {
    // Obtener lista de usuarios con paginación y filtros
    getUsers: async (params?: GetUsersParams): Promise<GetUsersResponse> => {
        try {
            const { data } = await axiosInstance.get('/users', { params });
            return data;
        } catch (error) {
            throw error;
        }
    },

    // Obtener un usuario por su ID
    getUserById: async (id: string): Promise<User> => {
        try {
            const { data } = await axiosInstance.get(`/users/${id}`);
            return data;
        } catch (error) {
            throw error;
        }
    },

    // Obtener el perfil del usuario actual
    getCurrentUser: async (): Promise<User> => {
        try {
            const { data } = await axiosInstance.get('/users/profile');
            return data;
        } catch (error) {
            throw error;
        }
    },

    // Actualizar información del usuario
    updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
        try {
            const { data } = await axiosInstance.put(`/users/${id}`, userData);
            return data;
        } catch (error) {
            throw error;
        }
    },

    // Actualizar el perfil del usuario actual
    updateProfile: async (userData: Partial<User>): Promise<User> => {
        try {
            const { data } = await axiosInstance.put('/users/profile', userData);
            return data;
        } catch (error) {
            throw error;
        }
    },

    // Cambiar contraseña
    changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
        try {
            await axiosInstance.post('/users/change-password', {
                currentPassword,
                newPassword
            });
        } catch (error) {
            throw error;
        }
    },

    // Activar/Desactivar usuario
    toggleUserStatus: async (id: string, is_active: boolean): Promise<User> => {
        try {
            const { data } = await axiosInstance.patch(`/users/${id}/status`, {
                is_active
            });
            return data;
        } catch (error) {
            throw error;
        }
    }
};

export default userService; 