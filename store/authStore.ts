import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginCredentials, AuthResponse } from '@/services/authService';
import axiosInstance from '@/services/config/axios';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}

const initializeAxios = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user: User) => set({ user, isAuthenticated: true }),
      
      setToken: (token: string) => {
        set({ token });
        initializeAxios(token);
      },

      login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
          const response = await axiosInstance.post<AuthResponse>('auth/login', credentials);
          
          if (response.data.status && response.data.data) {
            const { token, user } = response.data.data;
            set({ user, token, isAuthenticated: true });
            initializeAxios(token);
            return response.data;
          }
          throw new Error("Formato de respuesta inválido");
        } catch (error: any) {
          if (error.response) {
            throw {
              message: error.response.data.message || "Error de autenticación",
              error: error.response.data.error || "Error desconocido",
              statusCode: error.response.status,
            };
          }
          throw error;
        }
      },

      logout: async () => {
        try {
          await axiosInstance.post('auth/logout');
        } catch (error) {
          console.error('Error en logout:', error);
        } finally {
          set({ user: null, token: null, isAuthenticated: false });
          delete axiosInstance.defaults.headers.common['Authorization'];
          window.location.href = '/login';
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
); 