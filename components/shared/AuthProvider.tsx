"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { token, user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Si está autenticado en login, redirigir según rol
    if (token && user && isAuthenticated && pathname === "/login") {
      if (user.role === "assistant") {
        router.replace("/dashboard/profile");
      } else {
        router.replace("/dashboard");
      }
      return;
    }

    // Si intenta acceder al dashboard principal y es asistente
    if (pathname === "/dashboard" && user?.role === "assistant") {
      toast.error("No tienes permisos para acceder al dashboard");
      router.replace("/dashboard/profile");
      return;
    }

    // Si no está autenticado y está en ruta protegida
    if (!token && !isAuthenticated && pathname.startsWith("/dashboard")) {
      toast.error("Debes iniciar sesión");
      router.replace("/login");
      return;
    }
  }, [pathname, token, isAuthenticated, user?.role]);

  // No renderizar nada si no tiene permisos
  if (pathname === "/dashboard" && user?.role === "assistant") {
    return null;
  }

  // No renderizar nada del dashboard si no está autenticado
  if (pathname.startsWith("/dashboard") && (!token || !isAuthenticated)) {
    return null;
  }

  return children;
}
