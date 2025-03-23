// Interfaces para los formularios
export interface PersonalInfoForm {
    identification: string
    first_name: string
    last_name: string
    phone: string
    email: string
    password: string
    role: string
    token: string
    otp: string
    otp_expired: boolean
    created_at: string
    is_active: boolean
}

export interface PasswordChangeForm {
    newPassword: string
    confirmPassword: string
}

export type TabType = "informacion" | "contrasena" | "boletos"

type UserRole = "assistant" | "admin" | "superadmin"

export interface PerfilUsuarioProps {
    userRole: UserRole
}
  