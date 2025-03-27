import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { LoginCredentials } from "@/services/authService";

export const useLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewPasswordRecovery, setViewPasswordRecovery] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const onSubmit = handleSubmit(async (formData: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await authService.login(formData);
      toast.success("Sesión iniciada correctamente");

      setTimeout(() => {
        if (response.data.user.role === "assistant") {
          router.replace("/profile");
        } else {
          router.replace("/assistants");
        }
      }, 0);
    } catch (error: any) {
      toast.error(error.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  });

  const handleLogout = async () => {
    try {
      await authService.logout();
      setTimeout(() => {
        router.replace("/login");
      }, 0);
    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
  };

  return {
    register,
    onSubmit,
    errors,
    showPassword,
    togglePasswordVisibility: () => setShowPassword(!showPassword),
    isLoading,
    handleLogout,
    router,
    viewPasswordRecovery,
    setViewPasswordRecovery,
  };
};
