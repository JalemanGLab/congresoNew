import { useState, useEffect } from "react"
import Modal from "@/components/shared/modal/Modal"

const useFaqSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { Render,closeModalAction,toggleModal} = Modal()
    

    useEffect(() => {
        if (isModalOpen) {
            document.documentElement.classList.add('overflow-hidden')
        } else {
            document.documentElement.classList.remove('overflow-hidden')
        }
        
        return () => {
            document.documentElement.classList.remove('overflow-hidden')
        }
    }, [isModalOpen])

    return {
        isModalOpen,
        setIsModalOpen,
        Render,
        closeModalAction,
        toggleModal
    }
}   

export default useFaqSection
