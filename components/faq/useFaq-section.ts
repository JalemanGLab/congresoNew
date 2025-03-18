import { useState } from "react"
import Modal from "../Modal/Modal"

const useFaqSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const {toggleModal,closeModalAction,Render} = Modal()
    
    return {
        isModalOpen,
        toggleModal,
        closeModalAction,
        Render
    }
}   

export default useFaqSection
