"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md mx-auto bg-white border-neutral-200">
        <CardHeader className="space-y-2">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-neutral-900 text-center">¡Contraseña actualizada!</CardTitle>
          <CardDescription className="text-neutral-600 text-center">
            Tu contraseña ha sido actualizada correctamente. Ahora puedes iniciar sesión con tu nueva contraseña.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <button
            className="w-full h-11 bg-neutral-800 text-white rounded-[5px] font-medium hover:bg-neutral-900 transition-colors"
            onClick={() => (window.location.href = "/login")}
          >
            Ir a iniciar sesión
          </button>
        </CardFooter>
      </Card>
    </div>
  )
} 