import { useState, useEffect } from "react"

const useFaqSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    

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
        setIsModalOpen
    }
}   

export default useFaqSection
