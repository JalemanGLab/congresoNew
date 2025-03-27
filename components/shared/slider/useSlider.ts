import { useState, useEffect, useCallback, useRef } from "react"
import {Slide} from "./sliderDTO"

const useSlider = () => {
    const slides: Slide[] = [
        {
            id: 1,
            type: 'image',
            src: "https://jmpukiohbcemfjqcsikc.supabase.co/storage/v1/object/sign/sliders/banner-magno.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzbGlkZXJzL2Jhbm5lci1tYWduby5wbmciLCJpYXQiOjE3NDI1NjE5MzYsImV4cCI6MTc3NDA5NzkzNn0.Szvr9oWr4m9Mc0GNH26EToGNoYI05MPQKLLVTPBClXQ",
            alt: "Congreso Magno 3.0",
        },
        {
            id: 2,
            type: 'video',
            src: "/video/congreso.mp4",
            alt: "Video del Congreso",
            date: "15 DE JULIO, 2025",
            title: "VIDEO CONGRESO",
            country: "COLOMBIA 2025",
            subtitle: "Revive los momentos más importantes",
        },
        {
            id: 3,
            type: 'image',
            src: "https://img.freepik.com/foto-gratis/dentista-sexo-femenino-herramientas-odontologia-aisladas_1303-13189.jpg?t=st=1743003075~exp=1743006675~hmac=d530d2f3b8c52fc2687569da1468abba94df43c91f62a40cf6e988550ff0d025&w=996",
            alt: "Networking profesional",
            date: "15 DE JULIO, 2025",
            title: "NETWORKING PROFESIONAL",
            country: "COLOMBIA 2025",
            subtitle: "Conecta con colegas y expande tu red de contactos",
        },
        {
            id: 4,
            type: 'image',
            src: "https://img.freepik.com/foto-gratis/hermoso-dentista-trabajando-clinica-dental_1157-28570.jpg?t=st=1743003232~exp=1743006832~hmac=fc808adc6763ce77acd7ed9fac64236563d0255fc49419cad4325be6715158e9&w=996",
            alt: "Últimas tecnologías",
            date: "15 DE JULIO, 2025",
            title: "TECNOLOGÍA DE VANGUARDIA",
            country: "COLOMBIA 2025",
            subtitle: "Descubre las últimas innovaciones en el campo odontológico",
        }
    ]
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)


    const goToNextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, [])

    const goToPrevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }, [])

    const goToSlide = useCallback((index: number) => {
        setCurrentSlide(index)
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 10000)
    }, [])

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null

        if (isAutoPlaying) {
            interval = setInterval(goToNextSlide, 10000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    }, [isAutoPlaying, goToNextSlide])

    useEffect(() => {
        // Manejar la reproducción de videos
        videoRefs.current.forEach((videoRef, index) => {
            if (videoRef) {
                if (index === currentSlide && slides[index].type === 'video') {
                    videoRef.play().catch(error => console.error("Error playing video:", error))
                } else {
                    videoRef.pause()
                    videoRef.currentTime = 0
                }
            }
        })
    }, [currentSlide])

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 50) {
            // Swipe left
            goToNextSlide()
        }

        if (touchStart - touchEnd < -50) {
            // Swipe right
            goToPrevSlide()
        }
    }

    // Función para verificar si hay contenido para mostrar
    const hasContent = (slide: Slide) => {
        return !!(slide.date || slide.title || slide.country || slide.subtitle)
    }
    return {
        slides,
        currentSlide,
        isAutoPlaying,
        videoRefs,
        goToNextSlide,
        goToPrevSlide,
        goToSlide,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        hasContent,
        isModalOpen,
        setIsModalOpen
    }
}

export default useSlider
