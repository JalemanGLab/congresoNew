"use client"

import type React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import useSlider from "./useSlider"
import RegistrationModal from "@/components/pages/home/registration/registration-modal"

export default function Slider() {
    const {
        currentSlide,
        videoRefs,
        goToNextSlide,
        goToPrevSlide,
        goToSlide,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
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
            {/* Primera vista */}
            <div
                className={`absolute inset-0 transition-all duration-1000 ${0 === currentSlide ? "scale-100" : "opacity-0 scale-105"}`}
            >
                <Image
                    src={"https://jmpukiohbcemfjqcsikc.supabase.co/storage/v1/object/sign/sliders/web_slider_01.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzbGlkZXJzL3dlYl9zbGlkZXJfMDEud2VicCIsImlhdCI6MTc0MzQ4MjU2NywiZXhwIjoxNzc1MDE4NTY3fQ.fyfmX40KFjTkgWS6gpYTpbLF7DUe7y6mKAiS94cbuPg"}
                    alt="Primera vista del congreso"
                    fill
                    className="object-cover"
                    priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001208] via-[#001208]/70 to-transparent" />
                <div className="absolute inset-0 flex flex-col gap-6 sm:gap-10 items-center justify-center transition-all duration-1000 opacity-100 translate-y-0">
                    <div className="text-center space-y-4 sm:space-y-4 md:space-y-6 px-4 max-w-5xl">
                        <div className="inline-block px-1.5 py-[1px] rounded-full border border-[#82ffe4] text-white text-2xl md:text-4xl">
                            CONGRESO
                        </div>
                        <div className="flex flex-row gap-1 sm:gap-2 items-center justify-center text-white tracking-wider leading-tight">
                            <span className="text-6xl md:text-8xl lg:text-9xl font-bold block text-[#00e02b]">MAGNO</span>
                            <span className="text-6xl md:text-8xl lg:text-9xl font-light block text-[#acffe0]">3.0</span>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-1 sm:gap-2">
                            <div className="flex flex-row gap-1 sm:gap-2">
                                <div className="text-[#acffe0] font-light text-3xl sm:text-3xl md:text-4xl lg:text-5xl">Colombia</div>
                                <div className="text-[#acffe0] font-semibold text-3xl sm:text-3xl md:text-4xl lg:text-5xl">2025</div>
                            </div>
                            <div className="font-light text-white/90 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                                11 Junio
                            </div>
                        </div>
                    </div>
                    <div 
                        onClick={() => setIsModalOpen(true)}
                        className="flex justify-center items-center cursor-pointer rounded-full bg-[#15d094] text-black font-semibold text-base sm:text-lg px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 hover:opacity-80 transition-all duration-300"
                    >
                        Registrarme al evento
                    </div>
                </div>
            </div>

            {/* Segunda vista */}
            <div
                className={`absolute inset-0 transition-all duration-1000 ${1 === currentSlide ? "scale-100" : "opacity-0 scale-105"}`}
            >
                <Image
                    src={"https://jmpukiohbcemfjqcsikc.supabase.co/storage/v1/object/sign/sliders/web_slider_02.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzbGlkZXJzL3dlYl9zbGlkZXJfMDIud2VicCIsImlhdCI6MTc0MzQ4MjU2NywiZXhwIjoxNzc1MDE4NTY3fQ.fyfmX40KFjTkgWS6gpYTpbLF7DUe7y6mKAiS94cbuPg"}
                    alt="Segunda vista del congreso"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001208] via-[#001208]/70 to-transparent" />
            </div>

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
                <button
                    onClick={() => goToSlide(0)}
                    className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all ${
                        0 === currentSlide ? "bg-[#00FF66] w-8 sm:w-12" : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label="Ir a diapositiva 1"
                />
                <button
                    onClick={() => goToSlide(1)}
                    className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all ${
                        1 === currentSlide ? "bg-[#00FF66] w-8 sm:w-12" : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label="Ir a diapositiva 2"
                />
            </div>

            {/* Modal de registro */}
            <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}
