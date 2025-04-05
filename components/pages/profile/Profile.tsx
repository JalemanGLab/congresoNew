"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, MapPin, Ticket, Eye, EyeOff } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { PerfilUsuarioProps, TabType } from "./DTOProfile"
import useProfile from "./useProfile"
import { Toaster } from "sonner"


export default function PerfilUsuario({ userRole }: PerfilUsuarioProps) {
  
  const {
    registerInfo, 
    errorsInfo,
    activeTab,
    handleSubmitPassword,
    onSubmitPassword,
    gridCols,
    tabs,
    setActiveTab,
    registerPassword,
    showConfirmPassword,
    errorsPassword,
    handleSubmitInfo,
    onSubmitInfo,
    showNewPassword,
    setShowNewPassword,
    newPassword,
    setShowConfirmPassword,
    boletos,
    myTicket

  } = useProfile({userRole})

  return (
    <div className="container mx-auto py-6 px-4 md:py-10">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-8 text-neutral-900">Mi Perfil</h1>

      <div className="w-full mb-8">
        <div className={`w-full grid ${gridCols} gap-2 bg-neutral-100 p-1 rounded-lg max-w-8xl mx-auto`}>
          {tabs.map((tab:any) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`py-2 px-4 rounded-md text-sm sm:text-base transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-8xl mx-auto">
        {/* Sección de Información Personal */}
        {activeTab === "informacion" && (
          <Card className="bg-neutral-100 border-neutral-200">
            <form>
              <CardHeader>
                <CardTitle className="text-neutral-900">Información Personal</CardTitle>
                <CardDescription className="text-neutral-600">
                  Administra tu información personal y detalles de contacto.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-full grid gap-4 flex-1">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="identification" className="text-neutral-700">
                          Identificación
                        </Label>
                        <input
                          disabled
                          id="identification"
                          className={`w-full rounded-md h-10 border-[1px] pl-3 text-neutral-600 border-neutral-300 outline-none bg-neutral-50 ${errorsInfo.identification ? "border-red-500" : ""}`}
                          {...registerInfo("identification", { required: "La identificación es obligatoria" })}
                        />
                        {errorsInfo.identification && <p className="text-red-500 text-sm mt-1">{errorsInfo.identification.message}</p>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="first_name" className="text-neutral-700">
                          Nombre
                        </Label>
                        <input
                          disabled
                          id="first_name"
                          className={`w-full rounded-md h-10 border-[1px] pl-3 text-neutral-600 border-neutral-300 outline-none bg-neutral-50 ${errorsInfo.first_name ? "border-red-500" : ""}`}
                          {...registerInfo("first_name", { required: "El nombre es obligatorio" })}
                        />
                        {errorsInfo.first_name && <p className="text-red-500 text-sm mt-1">{errorsInfo.first_name.message}</p>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="last_name" className="text-neutral-700">
                          Apellido
                        </Label>
                        <input
                          disabled
                          id="last_name"
                          className={`w-full rounded-md h-10 border-[1px] pl-3 text-neutral-600 border-neutral-300 outline-none bg-neutral-50 ${errorsInfo.last_name ? "border-red-500" : ""}`}
                          {...registerInfo("last_name", { required: "El apellido es obligatorio" })}
                        />
                        {errorsInfo.last_name && <p className="text-red-500 text-sm mt-1">{errorsInfo.last_name.message}</p>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="phone" className="text-neutral-700">
                          Teléfono
                        </Label>
                        <input
                          disabled
                          id="phone"
                          className={`w-full rounded-md h-10 border-[1px] pl-3 text-neutral-600 border-neutral-300 outline-none bg-neutral-50 ${errorsInfo.phone ? "border-red-500" : ""}`}
                          {...registerInfo("phone", { required: "El teléfono es obligatorio" })}
                        />
                        {errorsInfo.phone && <p className="text-red-500 text-sm mt-1">{errorsInfo.phone.message}</p>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="text-neutral-700">
                          Correo electrónico
                        </Label>
                        <input
                          disabled
                          id="email"
                          type="email"
                          className={`w-full rounded-md h-10 border-[1px] pl-3 text-neutral-600 border-neutral-300 outline-none bg-neutral-50 ${errorsInfo.email ? "border-red-500" : ""}`}
                          {...registerInfo("email", {
                            required: "El email es obligatorio",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Email inválido",
                            },
                          })}
                        />
                        {errorsInfo.email && <p className="text-red-500 text-sm mt-1">{errorsInfo.email.message}</p>}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="role" className="text-neutral-700">
                          Rol
                        </Label>
                        <input
                          id="role"
                          className={`w-full rounded-md h-10 border-[1px] pl-3 text-neutral-600 border-neutral-300 outline-none bg-neutral-50 ${errorsInfo.role ? "border-red-500" : ""}`}
                          {...registerInfo("role")}
                          disabled
                        />
                      </div>

                    </div>
                  </div>
                </div>
              </CardContent>
             
            </form>
          </Card>
        )}

        {/* Sección de Cambiar Contraseña */}
        {activeTab === "contrasena" && (
          <Card className="bg-neutral-100 border-neutral-200">
            <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
              <CardHeader>
                <CardTitle className="text-neutral-900">Cambiar Contraseña</CardTitle>
                <CardDescription className="text-neutral-600">
                  Actualiza tu contraseña para mantener tu cuenta segura.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="newPassword" className="text-neutral-700">
                    Nueva contraseña
                  </Label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      className={`w-full rounded-md h-10 border-[1px] pl-3 text-neutral-600 border-neutral-300 outline-none bg-neutral-50 ${
                        errorsPassword.newPassword ? "border-red-500" : ""
                      }`}
                      {...registerPassword("newPassword", {
                        required: "La nueva contraseña es obligatoria",
                        minLength: {
                          value: 6,
                          message: "La contraseña debe tener al menos 6 caracteres",
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                          message:
                            "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errorsPassword.newPassword && (
                    <p className="text-red-500 text-sm mt-1">{errorsPassword.newPassword.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <Label htmlFor="confirmPassword" className="text-neutral-700">
                    Confirmar nueva contraseña
                  </Label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className={`w-full rounded-md h-10 border-[1px] pl-3 text-neutral-600 border-neutral-300 outline-none bg-neutral-50 ${
                        errorsPassword.confirmPassword ? "border-red-500" : ""
                      }`}
                      {...registerPassword("confirmPassword", {
                        required: "Debes confirmar la contraseña",
                        validate: (value) =>
                          value === newPassword || "Las contraseñas no coinciden",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errorsPassword.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorsPassword.confirmPassword.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="bg-neutral-800 hover:bg-neutral-600 text-neutral-50">
                  Actualizar contraseña
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        {/* Sección de Mi Boleto - Solo visible para usuarios */}
        {activeTab === "boletos" && (userRole === "assistant" || userRole === "admin" )&&  (
          <Card className="bg-neutral-100 border-neutral-200">
            <CardHeader>
              <CardTitle className="text-neutral-900">Mi Boleto</CardTitle>
              <CardDescription className="text-neutral-600">
                Visualiza y administra tu boleto para próximos eventos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {myTicket.map((boleto:any) => (
                  <div key={boleto.id} className="border border-neutral-400 rounded-lg p-4 space-y-4 bg-white shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                      <div>
                        <h3 className="font-semibold text-lg text-neutral-800">{boleto.evento}</h3>
                        <p className="text-sm text-neutral-500 font-medium">Boleto #{boleto.id}</p>
                      </div>
                      <Badge
                        variant={boleto.estado === "Confirmado" ? "default" : "secondary"}
                        className={
                          boleto.estado === "Confirmado"
                            ? "bg-green-100 text-green-800 hover:bg-green-200 whitespace-nowrap"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 whitespace-nowrap"
                        }
                      >
                        {boleto.estado}
                      </Badge>
                    </div>

                    <Separator className="bg-neutral-200" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div className="flex items-center gap-2 bg-neutral-50 p-2 rounded-md">
                        <CalendarDays className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-neutral-700">{boleto.fecha}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-neutral-50 p-2 rounded-md">
                        <Clock className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-neutral-700">{boleto.hora}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-neutral-50 p-2 rounded-md">
                        <MapPin className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-neutral-700">{boleto.lugar}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors w-full sm:w-auto"
                      >
                        <Ticket className="mr-2 h-4 w-4 text-neutral-600" />
                        Ver boleto
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

