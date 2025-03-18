"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import RegistrationModal from "../registration/registration-modal"

const slides = [
	{
		id: 1,
		image: "/banner-magno.png",
		alt: "Congreso Magno 3.0",
		title: "CONGRESO MAGNO 3.0",
		subtitle: "El evento odontológico más importante del año",
	},
	{
		id: 2,
		image: "/placeholder.svg?height=600&width=1200",
		alt: "Ponentes destacados",
		title: "PONENTES DE CLASE MUNDIAL",
		subtitle: "Aprende de los mejores especialistas en odontología",
	},
	{
		id: 3,
		image: "/placeholder.svg?height=600&width=1200",
		alt: "Networking profesional",
		title: "NETWORKING PROFESIONAL",
		subtitle: "Conecta con colegas y expande tu red de contactos",
	},
	{
		id: 4,
		image: "/placeholder.svg?height=600&width=1200",
		alt: "Últimas tecnologías",
		title: "TECNOLOGÍA DE VANGUARDIA",
		subtitle: "Descubre las últimas innovaciones en el campo odontológico",
	},
]

export default function EventSlider() {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [isAutoPlaying, setIsAutoPlaying] = useState(true)
	const [touchStart, setTouchStart] = useState(0)
	const [touchEnd, setTouchEnd] = useState(0)
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
		// Restart autoplay after 5 seconds of inactivity
		setTimeout(() => setIsAutoPlaying(true), 5000)
	}, [])

	// Función para desplazarse a la sección de evento
	const scrollToEvent = () => {
		const eventSection = document.getElementById("evento")
		if (eventSection) {
			eventSection.scrollIntoView({ behavior: "smooth" })
		}
	}

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		if (isAutoPlaying) {
			interval = setInterval(goToNextSlide, 5000)
		}

		return () => {
			if (interval) clearInterval(interval)
		}
	}, [isAutoPlaying, goToNextSlide])

	// Touch handlers for mobile swipe
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

	return (
		<div
			className="relative w-full h-[80vh] md:h-screen overflow-hidden"
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			{slides.map((slide, index) => (
				<div
					key={slide.id}
					className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
						}`}
				>
					<Image
						src={slide.image || "/placeholder.svg"}
						alt={slide.alt}
						fill
						className="object-cover"
						priority={index === 0}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-[#001208] via-[#001208]/70 to-transparent" />

					{/* Contenido del slide */}
					<div
						className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
							index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
						}`}
					>
						<div className="text-center space-y-4 sm:space-y-6 md:space-y-8 px-4 max-w-5xl">
							<div className="inline-block px-4 py-1.5 rounded-full bg-[#00FF66]/20 text-[#00FF66] font-medium text-sm mb-2 sm:mb-4">
								15 DE JULIO, 2025
							</div>
							<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-wider leading-tight">
								{slide.title}
								<span className="block text-[#00FF66]">COLOMBIA 2025</span>
							</h2>
							<p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto">
								{slide.subtitle}
							</p>
						</div>
					</div>

					<div className="absolute inset-0 flex items-end justify-center pb-10 sm:pb-16">
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								className="bg-[#00FF66] hover:bg-[#00DD55] text-[#001208] px-6 sm:px-8 group"
								onClick={() => setIsModalOpen(true)}
							>
								Registrarse Ahora
								<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="border-[#00FF66]/30 text-white hover:bg-[#00FF66]/10 hover:border-[#00FF66]"
								onClick={scrollToEvent}
							>
								Ver programa
							</Button>
						</div>
					</div>
				</div>
			))}

			{/* Navigation arrows - Adjusted for better mobile visibility */}
			<Button
				variant="ghost"
				size="icon"
				className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-black/30 hover:bg-black/50 text-white z-10"
				onClick={goToPrevSlide}
			>
				<ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
				<span className="sr-only">Anterior</span>
			</Button>

			<Button
				variant="ghost"
				size="icon"
				className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-black/30 hover:bg-black/50 text-white z-10"
				onClick={goToNextSlide}
			>
				<ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
				<span className="sr-only">Siguiente</span>
			</Button>

			{/* Indicators - Adjusted position for mobile */}
			<div className="absolute bottom-6 sm:bottom-12 left-0 right-0 flex justify-center gap-2 sm:gap-4 z-10">
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all ${index === currentSlide ? "bg-[#00FF66] w-8 sm:w-12" : "bg-white/50 hover:bg-white/80"
							}`}
						aria-label={`Ir a diapositiva ${index + 1}`}
					/>
				))}
			</div>

			{/* Modal de registro */}
			<RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</div>
	)
}

