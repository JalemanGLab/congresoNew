"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import usePage from "../usePage"

export default function CodePage() {
  const {
    email,
    verificationCode,
    handleCodeComplete,
    handleVerifyCode,
    isSubmitting,
    setVerificationCode
  } = usePage()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md mx-auto bg-white border-neutral-200">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-neutral-900">Verificar código</CardTitle>
          <CardDescription className="text-neutral-600">
            Ingresa el código de verificación enviado a tu correo electrónico.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verification-code" className="text-neutral-800">
                Código de verificación
              </Label>
              <div className="flex justify-center py-4">
                <InputOTP 
                  maxLength={6} 
                  value={verificationCode} 
                  onChange={handleCodeComplete} 
                  className="gap-2"
                  pattern="\d*"
                  inputMode="numeric"
                >
                  <InputOTPGroup>
                    <InputOTPSlot 
                      index={0} 
                      className="border-neutral-300 text-neutral-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    />
                    <InputOTPSlot 
                      index={1} 
                      className="border-neutral-300 text-neutral-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    />
                    <InputOTPSlot 
                      index={2} 
                      className="border-neutral-300 text-neutral-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    />
                    <InputOTPSlot 
                      index={3} 
                      className="border-neutral-300 text-neutral-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    />
                    <InputOTPSlot 
                      index={4} 
                      className="border-neutral-300 text-neutral-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    />
                    <InputOTPSlot 
                      index={5} 
                      className="border-neutral-300 text-neutral-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <p className="text-sm text-neutral-500 text-center">Hemos enviado un código de 6 dígitos a {email}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <button
            className="w-full h-11 bg-neutral-800 text-white rounded-[5px] font-medium hover:bg-neutral-900 transition-colors disabled:opacity-50 flex items-center justify-center"
            onClick={handleVerifyCode}
            disabled={isSubmitting || verificationCode.length !== 6}
          >
            {isSubmitting ? "Verificando..." : "Verificar código"}
            {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
          </button>
          <div className="flex flex-col gap-2 w-full">
            <button
              className="text-neutral-600 hover:text-neutral-800"
              onClick={() => {
                setVerificationCode("")
                window.location.href = "/RecoveryPassword"
              }}
              disabled={isSubmitting}
            >
              Volver a enviar código
            </button>
            <button
              onClick={() => window.location.href = "/login"}
              className="flex items-center justify-center text-neutral-600 hover:text-neutral-800 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio de sesión
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 