import { useAuthStore } from '@/store/authStore';

export interface User {
  id: string;
  identification: string;
  phone: string;
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
    return useAuthStore.getState().login(credentials);
  },

  logout: () => {
    useAuthStore.getState().logout();
  },

  isAuthenticated: (): boolean => {
    return useAuthStore.getState().isAuthenticated;
  },

  getCurrentUser: (): User | null => {
    return useAuthStore.getState().user;
  },

  getToken: (): string | null => {
    return useAuthStore.getState().token;
  }
};
