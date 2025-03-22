'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService, LoginCredentials, AuthError } from "@/services/authService";

export interface LoginFormValues {
  email: string;
  password: string;
}

export const useLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);    

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
      await authService.login(formData);
      toast.success("Inicio de sesión exitoso");
      router.push("/dashboard");
    } catch (error) {
      const authError = error as AuthError;
      toast.error("Error al iniciar sesión", {
        description: authError.message || "Por favor, verifica tus credenciales e intenta nuevamente."
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
    router
  };
};
