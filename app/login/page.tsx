"use client";

import Image from "next/image";
import { useLogin } from "./usePage";

// Importaciones de Lucide React
import { Mail, Lock, EyeOff, Eye, Calendar, MapPin, Clock, X } from "lucide-react";

// Importaciones de imágenes
import logo from "../../public/img/solventum-v1.png";
import bg_login from "../../public/img/bg-login.jpg";
import load from "../../public/img/loading.svg";
import { Toaster } from "sonner";
import { PasswordRecoveryForm } from "./components/PasswordRecovery/PasswordRecovery";

const PageLogin = () => {

  const {
    register,
    onSubmit,
    isLoading,
    errors,
    showPassword,
    togglePasswordVisibility, 
    router,
    setViewPasswordRecovery,
    viewPasswordRecovery
  } = useLogin();

  return (

    <div className="flex w-full h-screen">
      <Toaster position="top-right" />
      {
        viewPasswordRecovery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay con efecto de desenfoque */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setViewPasswordRecovery(false)}
            />
            
            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6 z-50">
              {/* Botón de cerrar */}
              <button 
                onClick={() => setViewPasswordRecovery(false)}
                className="absolute right-10 top-10 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center">
                
                <PasswordRecoveryForm />
              </div>
            </div>
          </div>
        )
      }
      {/* Panel izquierdo - Formulario */}
      <div className="flex  bg-white w-full items-center justify-center lg:w-[40%]">
        <div className="flex w-full max-w-[450px] flex-col items-center p-6 sm:p-6 md:p-8">
          <Image
            src={logo}
            alt="logo"
            width={280}
            height={80}
            className="w-[200px] py-2 sm:w-[240px] md:w-[280px] md:py-4"
          />
          <p className="mb-4 text-xs text-muted-foreground sm:text-sm sm:mb-6">
            Accede a tu cuenta para empezar la experiencia
          </p>

          <form
            onSubmit={onSubmit}
            className="flex w-full flex-col gap-3 sm:gap-4"
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col gap-1">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    {...register("email", {
                      required: "El email es requerido",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Formato de email inválido",
                      },
                    })}
                    type="email"
                    placeholder="Email"
                    className="w-full bg-white text-black h-10 sm:h-11 pl-10 pr-4 border border-input rounded-[5px] focus:outline-none focus:border-ring text-sm sm:text-base"
                  />
                </div>
                {errors.email && (
                  <span className="text-destructive text-[10px] sm:text-xs flex items-center gap-1">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    {...register("password", {
                      required: "La contraseña es requerida",
                      minLength: {
                        value: 6,
                        message:
                          "La contraseña debe tener al menos 6 caracteres",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full bg-white text-black h-10 sm:h-11 pl-10 pr-12 border border-input rounded-[5px] focus:outline-none focus:border-ring text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-destructive text-[10px] sm:text-xs flex items-center gap-1">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setViewPasswordRecovery(true)}
              className="text-xs sm:text-sm text-right cursor-pointer text-neutral-400 hover:text-neutral-800"
            >
              ¿Olvidaste tu contraseña?
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 sm:h-11 bg-background cursor-pointer text-white rounded-[5px] mt-2 flex items-center justify-center text-sm sm:text-base"
            >
              {isLoading ? (
                <Image
                  src={load}
                  alt="loading"
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              ) : (
                "Iniciar Sesión"
              )}
            </button>

          </form>
        </div>
      </div>

      {/* Panel derecho - Imagen de fondo */}
      <div className="hidden lg:block md:w-[60%] relative">
        <div className="absolute inset-0 bg-black/70" />
        <div
          className="h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${bg_login.src})`,
          }}
        >
          <div className="relative h-full flex flex-col gap-2 justify-center p-8 lg:p-16 text-white">
            <div className="w-[180px] lg:w-[200px] flex items-center gap-4 lg:gap-5 py-2 lg:py-3 rounded-[5px] ">
              <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
              <span className="text-sm lg:text-base pt-1">
                27 Abril de 2025
              </span>
            </div>
            <h1 className="text-4xl lg:text-[50px] xl:text-[60px] font-bold">
              Congreso Magno 3.0
            </h1>
            <p className="text-base lg:text-lg mb-6 lg:mb-2 max-w-[610px] py-4 lg:py-6 rounded-[5px] ">
              El evento odontológico más importante del año. Únete a expertos
              internacionales y descubre las últimas innovaciones en tecnología
              dental.
            </p>
            <div className="flex flex-col gap-2 lg:gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="text-sm lg:text-base">
                  Centro de converciones, Bogotá - Colombia.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 lg:w-6 lg:h-6" />
                <span className="text-sm lg:text-base">9:00 AM - 6:00 PM</span>
              </div>
            </div>
            <button
              onClick={() => router.push("/")}
              className="w-[180px] lg:w-[220px] px-3 mt-2 lg:px-4 py-2 cursor-pointer rounded-[5px] bg-primary text-white text-sm lg:text-base"
            >
              Ver sitio web
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
