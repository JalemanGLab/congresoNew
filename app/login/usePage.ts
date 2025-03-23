'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/services/authService";

export interface LoginFormValues {
  email: string;
  password: string;
}

export const useLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);    
  const [viewPasswordRecovery, setViewPasswordRecovery] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (formData: LoginFormValues) => {
    try {
      setIsLoading(true);
      const response = await authService.login(formData);
      
      if (response.data.user) {
        toast.success("Inicio de sesión exitoso");
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error("Error al iniciar sesión", {
        description: error.message || "Por favor, verifica tus credenciales e intenta nuevamente."
      });
    } finally {
      setIsLoading(false);
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    register,
    onSubmit,
    errors,
    showPassword,
    togglePasswordVisibility,
    isLoading,
    router,
    viewPasswordRecovery,
    setViewPasswordRecovery
  };
};
