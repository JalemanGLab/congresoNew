"use client";
import { useEffect, useState } from "react";
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
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateAccess = async () => {
      if (!token || !isAuthenticated) {
        if (pathname.startsWith("/dashboard")) {
          toast.error("Debes iniciar sesión");
          router.replace("/login");
        }
      } else if (pathname === "/login") {
        router.replace(user?.role === "assistant" ? "/dashboard/profile" : "/dashboard");
      } else if (pathname === "/dashboard" && user?.role === "assistant") {
        toast.error("No tienes permisos para acceder al dashboard");
        router.replace("/dashboard/profile");
      }
      setIsValidating(false);
    };

    validateAccess();
  }, [pathname, token, isAuthenticated, user?.role]);

  // No mostrar nada mientras se valida
  if (isValidating) {
    return null;
  }

  // Validaciones de acceso
  if (pathname === "/dashboard" && user?.role === "assistant") {
    return null;
  }

  if (pathname.startsWith("/dashboard") && (!token || !isAuthenticated)) {
    return null;
  }

  return children;
}
