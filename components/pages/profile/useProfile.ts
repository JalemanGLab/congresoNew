import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { PasswordChangeForm, PerfilUsuarioProps, PersonalInfoForm, TabType } from "./DTOProfile"
import { toast } from "sonner"
import { AuthResponse, authService } from "@/services/authService"

const useProfile = ({userRole}:PerfilUsuarioProps) => {
    const [activeTab, setActiveTab] = useState<TabType>("informacion")
    const [data, setData] = useState<any>()
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Formulario de información personal
    const {
        register: registerInfo,
        handleSubmit: handleSubmitInfo,
        formState: { errors: errorsInfo },
        setValue
    } = useForm<PersonalInfoForm>()

    useEffect(()=> {
        const getData = async ()  => {
            const data = await authService.getCurrentUser()
            setData(data)
            if (data) {
                setValue('email', data.email || '')
                setValue('first_name', data.first_name || '')
                setValue('last_name', data.last_name || '')
                setValue('identification', data.identification || '')
                setValue('phone', data.phone || '')
                setValue('role', data.role || '')
            }
        }
        getData()
    },[])

    // Formulario de cambio de contraseña
    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: errorsPassword },
        watch,
        reset: resetPassword
    } = useForm<PasswordChangeForm>()

    // Para validar que las contraseñas coincidan
    const newPassword = watch("newPassword")

    // Manejadores de envío de formularios
    const onSubmitInfo = (data: PersonalInfoForm) => {
        toast.success("Información actualizada", {
            description: "Tu información personal ha sido actualizada correctamente."
        })
    }

    const onSubmitPassword = async (data: PasswordChangeForm) => {
        try {
            const response = await authService.changePassword(data.newPassword)
            if (response.status) {
                toast.success("Contraseña actualizada", {
                    description: "Tu contraseña ha sido actualizada correctamente."
                })
                resetPassword()
            } else {
                toast.error("Error al actualizar contraseña", {
                    description: response.message
                })
            }
        } catch (error: any) {
            toast.error("Error", {
                description: error.message || "Error al actualizar la contraseña"
            })
        }
    }

    const [boletos] = useState([
        {
            id: "BOL-001",
            evento: "Concierto de Rock en Vivo",
            fecha: "15 de Abril, 2025",
            hora: "20:00",
            lugar: "Auditorio Nacional",
            estado: "Confirmado",
        },
    ])

    // Función para obtener las tabs según el rol
    const getTabs = () => {
        const tabs = [
            {
                id: "informacion",
                label: "Información Personal",
            },
            {
                id: "contrasena",
                label: "Cambiar Contraseña",
            },
        ]

        if (userRole === "assistant" || userRole === "admin" ) {
            tabs.push({
                id: "boletos",
                label: "Mi Boleto",
            })
        }

        return tabs
    }

    const tabs = getTabs()
    const gridCols = tabs.length === 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-3"

    return {
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
        boletos
    }
}

export default useProfile;