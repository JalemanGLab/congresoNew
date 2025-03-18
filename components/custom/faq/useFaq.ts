import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { QuestionMap } from "./DTOFaq"

const useFaq = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [openItem, setOpenItem] = useState<string>("")
    const location = useLocation()

    // Mapa de preguntas a IDs de acordeón
    const questionToAccordionMap: QuestionMap = {
        "¿Cómo me registro en el congreso?": "registro",
        "¿Cuál es el costo de inscripción?": "costos",
        "¿Dónde se realizará el evento?": "ubicacion",
        "¿Cuándo inicia el congreso?": "fecha",
    }

    useEffect(() => {
        const hash = location.hash.replace('#', '')
        if (hash) {
            setOpenItem(hash)
            // Scroll suave hasta el elemento
            const element = document.getElementById(hash)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        }
    }, [location])

    const filterQuestions = (items: string[]) => {
        if (!searchQuery) return items
        const normalizedQuery = normalizeText(searchQuery)
        return items.filter(item =>
            normalizeText(item).includes(normalizedQuery)
        )
    }


    // Función para normalizar texto (remover tildes)
    const normalizeText = (text: string): string => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    }
    return {
        searchQuery,
        setSearchQuery,
        filterQuestions,
        normalizeText,
        openItem,
        setOpenItem,
        location,
        questionToAccordionMap
    }
}

export default useFaq
