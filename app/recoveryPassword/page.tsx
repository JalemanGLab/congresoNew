"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import usePage from "./usePage"

export default function RecoveryPasswordPage() {
  const {
    handleSendEmail,
    isSubmitting
  } = usePage()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md mx-auto bg-white border-neutral-200">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-neutral-900">Recuperar contraseña</CardTitle>
          <CardDescription className="text-neutral-600">
            Ingresa tu correo electrónico y te enviaremos un código de verificación.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-neutral-800">
                Correo electrónico
              </Label>
              <input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                required
                className="px-3 rounded-sm border border-neutral-300 w-full h-10 bg-white text-neutral-700 outline-none [-webkit-text-fill-color:#374151] [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[0_0_0_30px_white_inset] [&:-webkit-autofill:active]:[-webkit-text-fill-color:#374151] [&:-webkit-autofill:focus]:[-webkit-text-fill-color:#374151]"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <button
            className="w-full h-11 bg-neutral-800 text-white rounded-[5px] font-medium hover:bg-neutral-900 transition-colors disabled:opacity-50"
            onClick={(e) => {
              const email = (document.getElementById('email') as HTMLInputElement).value
              handleSendEmail(e, email)
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar código de verificación"}
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
