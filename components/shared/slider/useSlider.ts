import { useState, useEffect, useCallback, useRef } from "react"
import { Slide } from "./sliderDTO"

const TOTAL_SLIDES = 2

const useSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

    const goToNextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === TOTAL_SLIDES - 1 ? 0 : prev + 1))
    }, [])

    const goToPrevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? TOTAL_SLIDES - 1 : prev - 1))
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

    const scrollToRegistro = () => {
        const registroSection = document.querySelector('#registro')
        registroSection?.scrollIntoView({ behavior: 'smooth' })
    }

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
        return !!(slide.date || slide.title1 || slide.title2 || slide.subtitle)
    }
    return {
        currentSlide,
        videoRefs,
        goToNextSlide,
        goToPrevSlide,
        goToSlide,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        hasContent,
        scrollToRegistro
    }
}

export default useSlider
