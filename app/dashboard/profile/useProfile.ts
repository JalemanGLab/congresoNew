'use client'
import { authService } from "@/services/authService";
import { useEffect, useState } from "react";



const useProfile = () => {

    const [rol, setRol] = useState<any>()

    
    useEffect(()=>{
        const getData = async () => {
            const data = await authService.getCurrentUser()
            setRol(data?.role)
        }
        getData()
    },[])

    return {
        rol
    }
}

export default useProfile