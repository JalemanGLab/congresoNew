"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { toast } from 'sonner'
import { recoveryService } from "@/services/recoveryService"

export function PasswordRecoveryForm() {
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [resetToken, setResetToken] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "code_sent" | "password_reset" | "success">("idle")
  const [responseStatus, setResponseStatus] = useState<number | null>(null)

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResponseStatus(null)

    try {
      const response = await recoveryService.sendRecoveryCode(email);
      setResponseStatus(response.status);
      
      if (response.status === 201) {
        setStatus("code_sent");
        toast.success(response.message || 'Código de verificación enviado');
      } else {
        toast.error(response.message || 'Error al enviar el código');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al enviar el código');
      setResponseStatus(error.response?.status || 400);
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResponseStatus(null)

    try {
      const response = await recoveryService.verifyCode(email, verificationCode);
      setResponseStatus(response.status ? 201 : 400);

      if (response.status && response.resetToken) {
        toast.success('Código verificado correctamente');
        setResetToken(response.resetToken);
        setStatus("password_reset");
      } else {
        toast.error(response.message || 'Código inválido');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al verificar el código');
      setResponseStatus(error.response?.status || 400);
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await recoveryService.resetPassword(resetToken, newPassword);
      
      if (response.status) {
        toast.success('Contraseña actualizada correctamente');
        setStatus("success");
      } else {
        toast.error(response.message || 'Error al actualizar la contraseña');
      }
    } catch (error: any) {

      toast.error(error.message || 'Error al actualizar la contraseña');
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCodeComplete = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setVerificationCode(numericValue);
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white border-neutral-200">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold text-neutral-900">Recuperar contraseña</CardTitle>
        <CardDescription className="text-neutral-600">
          {status === "code_sent"
            ? "Ingresa el código de verificación enviado a tu correo electrónico."
            : status === "password_reset"
            ? "Ingresa tu nueva contraseña"
            : "Ingresa tu correo electrónico y te enviaremos un código de verificación."}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {status === "idle" && (
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-neutral-800">
                Correo electrónico
              </Label>
              <input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-3 rounded-sm border border-neutral-300 w-full h-10 bg-white text-neutral-700 outline-none [-webkit-text-fill-color:#374151] [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[0_0_0_30px_white_inset] [&:-webkit-autofill:active]:[-webkit-text-fill-color:#374151] [&:-webkit-autofill:focus]:[-webkit-text-fill-color:#374151]"
              />
            </div>
          </div>
        )}

        {status === "code_sent" && (
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
        )}

        {status === "password_reset" && (
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
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {status === "idle" && (
          <button
            className="w-full h-11 bg-neutral-800 text-white rounded-[5px] font-medium hover:bg-neutral-900 transition-colors disabled:opacity-50"
            onClick={handleSendEmail}
            disabled={isSubmitting || !email}
          >
            {isSubmitting ? "Enviando..." : "Enviar código de verificación"}
          </button>
        )}

        {status === "code_sent" && (
          <>
            <button
              className="w-full h-11 bg-neutral-800 text-white rounded-[5px] font-medium hover:bg-neutral-900 transition-colors disabled:opacity-50 flex items-center justify-center"
              onClick={handleVerifyCode}
              disabled={isSubmitting || verificationCode.length !== 6}
            >
              {isSubmitting ? "Verificando..." : "Verificar código"}
              {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
            </button>
            <button
              className="text-neutral-600 hover:text-neutral-800"
              onClick={() => {
                setStatus("idle")
                setVerificationCode("")
              }}
              disabled={isSubmitting}
            >
              Volver a enviar código
            </button>
          </>
        )}

        {status === "password_reset" && (
          <button
            className="w-full h-11 bg-neutral-800 text-white rounded-[5px] font-medium hover:bg-neutral-900 transition-colors disabled:opacity-50 flex items-center justify-center"
            onClick={handleResetPassword}
            disabled={isSubmitting || !newPassword || newPassword.length < 6}
          >
            {isSubmitting ? "Actualizando..." : "Actualizar contraseña"}
            {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
          </button>
        )}

        {status === "success" && (
          <button
            className="w-full h-11 bg-neutral-800 text-white rounded-[5px] font-medium hover:bg-neutral-900 transition-colors"
            onClick={() => (window.location.href = "/login")}
          >
            Ir a iniciar sesión
          </button>
        )}
      </CardFooter>
    </Card>
  )
}

