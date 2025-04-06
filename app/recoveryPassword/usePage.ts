'use client'
import { recoveryService } from "@/services/recoveryService"
import { useState, useEffect } from "react"
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'

const usePage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState(searchParams.get('email') || '')
  const [resetToken, setResetToken] = useState(searchParams.get('token') || '')

  useEffect(() => {
    setEmail(searchParams.get('email') || '')
    setResetToken(searchParams.get('token') || '')
  }, [searchParams])

  const [verificationCode, setVerificationCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [responseStatus, setResponseStatus] = useState<number | null>(null)

  const handleSendEmail = async (e: React.FormEvent, email: string) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResponseStatus(null)

    try {
      const response = await recoveryService.sendRecoveryCode(email);
      setResponseStatus(response.status);
      
      if (response.status === 201) {
        router.push(`/recoveryPassword/code?email=${encodeURIComponent(email)}`)
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
        router.push(`/recoveryPassword/reset?token=${encodeURIComponent(response.resetToken)}&email=${encodeURIComponent(email)}`)
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
        router.push('/recoveryPassword/success')
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

  return {
    email,
    verificationCode,
    handleCodeComplete,
    showPassword,
    newPassword,
    setNewPassword,
    setShowPassword,
    handleSendEmail,
    isSubmitting,
    handleVerifyCode,
    setVerificationCode,
    handleResetPassword,
    resetToken
  }
}

export default usePage
