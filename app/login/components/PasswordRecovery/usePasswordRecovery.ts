'use client'
import { recoveryService } from "@/services/recoveryService"
import { useState } from "react"
import { toast } from 'sonner'

const usePasswordRecovery = () => {

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
      console.log('Respuesta del servidor:', response);
      setResponseStatus(response.status);
      
      if (response.status === 201) {
        setStatus("code_sent");
        toast.success(response.message || 'Código de verificación enviado');
      } else {
        toast.error(response.message || 'Error al enviar el código');
      }
    } catch (error: any) {
      console.error('Error completo:', error);
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



    return{
        status,
        email,
        setEmail,
        verificationCode,
        handleCodeComplete,
        showPassword,
        newPassword,
        setNewPassword,
        setShowPassword,
        handleSendEmail,
        isSubmitting,
        handleVerifyCode,
        setStatus,
        setVerificationCode,
        handleResetPassword,
    }
}

export default usePasswordRecovery;