import { useState } from "react"
import { useForm } from "react-hook-form"
import { PasswordChangeForm, PerfilUsuarioProps, PersonalInfoForm, TabType } from "./DTOProfile"
import { toast } from "sonner"


const useProfile = ({userRole}:PerfilUsuarioProps) => {

    const [activeTab, setActiveTab] = useState<TabType>("informacion")
    const [usuario] = useState({
        identification: "123456789",
        first_name: "Carlos",
        last_name: "Rodríguez",
        phone: "+52 55 1234 5678",
        email: "carlos@ejemplo.com",
        password: "",
        role: userRole,
        token: "",
        otp: "",
        otp_expired: false,
        created_at: new Date().toISOString(),
        is_active: true
    })

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Formulario de información personal
    const {
        register: registerInfo,
        handleSubmit: handleSubmitInfo,
        formState: { errors: errorsInfo },
    } = useForm<PersonalInfoForm>({
        defaultValues: {
            identification: usuario.identification,
            first_name: usuario.first_name,
            last_name: usuario.last_name,
            phone: usuario.phone,
            email: usuario.email,
            password: usuario.password,
            role: usuario.role,
            token: usuario.token,
            otp: usuario.otp,
            otp_expired: usuario.otp_expired,
            created_at: usuario.created_at,
            is_active: usuario.is_active
        },
    })

    // Formulario de cambio de contraseña
    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: errorsPassword },
        watch,
    } = useForm<PasswordChangeForm>()

    // Para validar que las contraseñas coincidan
    const newPassword = watch("newPassword")

    // Manejadores de envío de formularios
    const onSubmitInfo = (data: PersonalInfoForm) => {
        console.log("Información personal actualizada:", data)
        toast.success("Información actualizada", {
            description: "Tu información personal ha sido actualizada correctamente."
        })
    }

    const onSubmitPassword = (data: PasswordChangeForm) => {
        console.log("Contraseña actualizada:", data)
        toast.success("Contraseña actualizada", {
            description: "Tu contraseña ha sido actualizada correctamente."
        })
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

        if (userRole === "usuario" || userRole === "admin" ) {
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
        showCurrentPassword,
        registerPassword,
        showConfirmPassword,
        errorsPassword,
        handleSubmitInfo,
        onSubmitInfo,
        setShowCurrentPassword,
        showNewPassword,
        setShowNewPassword,
        newPassword,
        setShowConfirmPassword,
        boletos
    }

}

export default useProfile;