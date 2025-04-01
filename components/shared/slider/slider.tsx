"use client";

import type React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useSlider from "./useSlider";

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
    scrollToRegistro,
  } = useSlider();

  return (
    <div className="relative w-full h-[80vh] md:h-screen overflow-hidden">
      {/* Primera vista */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          0 === currentSlide ? "opacity-100 z-10" : "opacity-0 scale-105 -z-10"
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={
            "https://jmpukiohbcemfjqcsikc.supabase.co/storage/v1/object/sign/sliders/web_slider_01.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzbGlkZXJzL3dlYl9zbGlkZXJfMDEud2VicCIsImlhdCI6MTc0MzQ4MjU2NywiZXhwIjoxNzc1MDE4NTY3fQ.fyfmX40KFjTkgWS6gpYTpbLF7DUe7y6mKAiS94cbuPg"
          }
          alt="Image1"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001208] via-[#001208]/70 to-transparent z-10" />
        <div className="absolute inset-0 flex flex-col gap-6 sm:gap-10 items-center justify-center z-20 pointer-events-none">
          <div className="text-center space-y-4 sm:space-y-4 md:space-y-6 px-4 max-w-5xl pointer-events-none">
            <div className="inline-block px-1.5 py-[1px] rounded-full border border-[#82ffe4] text-white text-2xl md:text-4xl">
              CONGRESO
            </div>
            <div className="flex flex-row gap-1 sm:gap-2 items-center justify-center text-white tracking-wider leading-tight">
              <span className="text-6xl md:text-8xl lg:text-9xl font-bold block text-[#00e02b]">
                MAGNO
              </span>
              <span className="text-6xl md:text-8xl lg:text-9xl font-light block text-[#acffe0]">
                3.0
              </span>
            </div>
            <div className="flex flex-col justify-center items-center gap-1 sm:gap-2">
              <div className="flex flex-row gap-1 sm:gap-2">
                <div className="text-[#acffe0] font-light text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
                  Colombia
                </div>
                <div className="text-[#acffe0] font-semibold text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
                  2025
                </div>
              </div>
              <div className="font-light text-white/90 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                11 Junio
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={scrollToRegistro}
            className="pointer-events-auto relative z-30 flex justify-center items-center cursor-pointer rounded-full bg-[#15d094] text-black font-semibold text-base sm:text-lg px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 hover:bg-[#13bb85] active:scale-95 transition-all duration-300"
          >
            Ir al evento
          </button>
        </div>
      </div>

      {/* Segunda vista */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          1 === currentSlide ? "opacity-100 z-10" : "opacity-0 scale-105 -z-10"
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-full w-full">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="https://jmpukiohbcemfjqcsikc.supabase.co/storage/v1/object/sign/sliders/web_slider_02.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzbGlkZXJzL3dlYl9zbGlkZXJfMDIud2VicCIsImlhdCI6MTc0MzQ4MzkyMCwiZXhwIjoxNzc1MDE5OTIwfQ.aGo7q7pgxigS2oI3UmvdhosMaWQhPP30_OgFScUmCDU"
              alt="Image2"
              fill
              className="object-cover object-left "
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#001208] via-[#001208]/70 to-transparent" />

          {/* Contenido móvil centrado */}
          <div className="lg:hidden absolute inset-0 flex flex-col items-center justify-center text-center px-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Bienvenido al futuro de la
              <br className="hidden sm:block" /> odontología y ortodoncia
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-lg mx-auto leading-relaxed">
              Descubre las últimas tendencias y avances tecnológicos en
              odontología y ortodoncia.
            </p>
            <button
              type="button"
              onClick={scrollToRegistro}
              className="mt-4  flex justify-center items-center cursor-pointer rounded-full bg-[#15d094] text-black font-semibold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#13bb85] transition-all duration-300"
            >
              Ir al evento
            </button>
          </div>

          {/* Contenido desktop alineado a la izquierda */}
          <div className="hidden lg:flex absolute inset-0 items-center">
            <div className="ml-20 xl:ml-32 max-w-2xl space-y-8">
              <h2 className="text-5xl xl:text-6xl font-bold text-white leading-tight">
                Bienvenido al futuro de la odontología y ortodoncia
              </h2>
              <p className="text-xl xl:text-2xl text-white/90 leading-relaxed">
                Descubre las últimas tendencias y avances tecnológicos en
                odontología y ortodoncia.
              </p>
              <button
                type="button"
                onClick={scrollToRegistro}
                className="mt-4 flex justify-center items-center cursor-pointer rounded-full bg-[#15d094] text-black font-semibold text-lg px-10 py-4 hover:bg-[#13bb85] transition-all duration-300"
              >
                Registrarme al evento
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-black/30 hover:bg-black/50 text-white z-40"
        onClick={goToPrevSlide}
      >
        <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
        <span className="sr-only">Anterior</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-black/30 hover:bg-black/50 text-white z-40"
        onClick={goToNextSlide}
      >
        <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
        <span className="sr-only">Siguiente</span>
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-6 sm:bottom-12 left-0 right-0 flex justify-center gap-2 sm:gap-4 z-40">
        <button
          onClick={() => goToSlide(0)}
          className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all ${
            0 === currentSlide
              ? "bg-[#00FF66] w-8 sm:w-12"
              : "bg-white/50 hover:bg-white/80"
          }`}
          aria-label="Ir a diapositiva 1"
        />
        <button
          onClick={() => goToSlide(1)}
          className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all ${
            1 === currentSlide
              ? "bg-[#00FF66] w-8 sm:w-12"
              : "bg-white/50 hover:bg-white/80"
          }`}
          aria-label="Ir a diapositiva 2"
        />
      </div>
    </div>
  );
}
