import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/services/authService";
import axiosInstance from "@/services/config/axios";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

const initializeAxios = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user: User, token: string) => {
        set({ user, token, isAuthenticated: true });
        initializeAxios(token);
        // Guardar token en cookie para el middleware
        Cookies.set("_cm_sec", token, {
          expires: 1, // 1 día
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        });
      },

      clearAuth: () => {
        set({ user: null, token: null, isAuthenticated: false });
        delete axiosInstance.defaults.headers.common["Authorization"];
        // Eliminar cookie
        Cookies.remove("_cm_sec", { path: "/" });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
