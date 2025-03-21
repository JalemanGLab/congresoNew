import { useState, useEffect } from "react"
import Modal from "@/components/shared/modal/Modal"
import { useRouter } from 'next/navigation';

const useFaqSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { Render,closeModalAction,toggleModal} = Modal()
    const router = useRouter();

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
        toggleModal,
        router
    }
}   

export default useFaqSection
