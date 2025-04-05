"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowRight, Eye, EyeOff, ArrowLeft } from "lucide-react"
import usePage from "../usePage"

export default function ResetPasswordPage() {
  const {
    newPassword,
    setNewPassword,
    showPassword,
    setShowPassword,
    handleResetPassword,
    isSubmitting
  } = usePage()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md mx-auto bg-white border-neutral-200">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-neutral-900">Nueva contraseña</CardTitle>
          <CardDescription className="text-neutral-600">
            Ingresa tu nueva contraseña
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="new-password" className="text-neutral-800">
                Nueva contraseña
              </Label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="px-3 pr-10 rounded-sm border border-neutral-300 w-full h-10 bg-white text-neutral-700 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <button
            className="w-full h-11 bg-neutral-800 text-white rounded-[5px] font-medium hover:bg-neutral-900 transition-colors disabled:opacity-50 flex items-center justify-center"
            onClick={handleResetPassword}
            disabled={isSubmitting || !newPassword || newPassword.length < 6}
          >
            {isSubmitting ? "Actualizando..." : "Actualizar contraseña"}
            {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
          </button>
          <button
            onClick={() => window.location.href = "/login"}
            className="flex items-center justify-center text-neutral-600 hover:text-neutral-800 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio de sesión
          </button>
        </CardFooter>
      </Card>
    </div>
  )
} 