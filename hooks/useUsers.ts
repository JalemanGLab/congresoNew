import { useState } from 'react';
import { userService, User, GetUsersParams, GetUsersResponse } from '../services/userService';
import { toast } from 'sonner';

export const useUsers = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState<string | null>(null);

    // Obtener lista de usuarios
    const fetchUsers = async (params?: GetUsersParams) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await userService.getUsers(params);
            setUsers(response.users);
            setTotalUsers(response.total);
            setCurrentPage(response.page);
        } catch (error) {
            setError('Error al cargar los usuarios');
            toast.error('Error', {
                description: 'No se pudieron cargar los usuarios'
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Obtener un usuario por ID
    const fetchUserById = async (id: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const user = await userService.getUserById(id);
            return user;
        } catch (error) {
            setError('Error al cargar el usuario');
            toast.error('Error', {
                description: 'No se pudo cargar la información del usuario'
            });
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    // Actualizar usuario
    const updateUser = async (id: string, userData: Partial<User>) => {
        try {
            setIsLoading(true);
            setError(null);
            const updatedUser = await userService.updateUser(id, userData);
            // Actualizar la lista de usuarios si el usuario actualizado está en ella
            setUsers(users.map(user => user.identification === id ? updatedUser : user));
            toast.success('Usuario actualizado', {
                description: 'La información del usuario se actualizó correctamente'
            });
            return updatedUser;
        } catch (error) {
            setError('Error al actualizar el usuario');
            toast.error('Error', {
                description: 'No se pudo actualizar la información del usuario'
            });
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    // Cambiar estado del usuario (activar/desactivar)
    const toggleUserStatus = async (id: string, isActive: boolean) => {
        try {
            setIsLoading(true);
            setError(null);
            const updatedUser = await userService.toggleUserStatus(id, isActive);
            // Actualizar la lista de usuarios
            setUsers(users.map(user => user.identification === id ? updatedUser : user));
            toast.success('Estado actualizado', {
                description: `Usuario ${isActive ? 'activado' : 'desactivado'} correctamente`
            });
            return true;
        } catch (error) {
            setError('Error al cambiar el estado del usuario');
            toast.error('Error', {
                description: 'No se pudo cambiar el estado del usuario'
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        users,
        totalUsers,
        currentPage,
        isLoading,
        error,
        fetchUsers,
        fetchUserById,
        updateUser,
        toggleUserStatus
    };
};

export default useUsers; 