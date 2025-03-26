"use client"

import type React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import useSlider from "./useSlider"
import RegistrationModal from "@/components/pages/home/registration/registration-modal"

export default function Slider() {
    const {
        slides,
        currentSlide,
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
      } = useSlider()

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
                    className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
                >
                    {slide.type === 'image' ? (
                        <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    ) : (
                        <video
                            ref={(el) => {
                                if (videoRefs.current) {
                                    videoRefs.current[index] = el
                                }
                            }}
                            src={slide.src}
                            muted
                            playsInline
                            loop
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#001208] via-[#001208]/70 to-transparent" />

                    {/* Contenido del slide - Solo se muestra si hay contenido */}
                    {hasContent(slide) && (
                        <div
                            className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
                                index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            }`}
                        >
                            <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 px-4 max-w-5xl">
                                {slide.date && (
                                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#00FF66]/20 text-[#00FF66] font-medium text-sm mb-2 sm:mb-4">
                                        {slide.date}
                                    </div>
                                )}
                                {(slide.title || slide.country) && (
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-wider leading-tight">
                                        {slide.title}
                                        {slide.country && <span className="block text-[#00FF66]">{slide.country}</span>}
                                    </h2>
                                )}
                                {slide.subtitle && (
                                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto">
                                        {slide.subtitle}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* Navigation arrows */}
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

            {/* Indicators */}
            <div className="absolute bottom-6 sm:bottom-12 left-0 right-0 flex justify-center gap-2 sm:gap-4 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all ${
                            index === currentSlide ? "bg-[#00FF66] w-8 sm:w-12" : "bg-white/50 hover:bg-white/80"
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
