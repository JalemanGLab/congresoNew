"use client";

import Image from "next/image";
import useHero from "./useHero";

export default function HeroSection() {
  const { scrollToRegistro } = useHero();

  return (
    <section id="inicio" className="relative w-full h-screen">
      {/* Contenedor de la imagen de fondo con position relative */}
      <div className="relative w-full h-full">
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <Image
              src="https://jmpukiohbcemfjqcsikc.supabase.co/storage/v1/object/sign/sliders/background_hero_section.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzbGlkZXJzL2JhY2tncm91bmRfaGVyb19zZWN0aW9uLmpwZyIsImlhdCI6MTc0MzU1OTgxMiwiZXhwIjoxNzc1MDk1ODEyfQ.2k5MP6KlBgPkMPn_mWfd8QlB9E5vd11jHYuClYJL6uc"
              alt="Background"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col justify-center items-center text-center">
          <div className=" flex flex-col items-center justify-center gap-10">
            <div className="flex flex-col">
              {/* Título Congreso */}
              <h1 className="text-white text-start text-[20px] sm:text-[24px] md:text-[32px] lg:text-[40px] font-light mb-1 leading-[1.1]">
                Congreso
              </h1>

              {/* MAGNO 3.0 */}
              <div className="flex items-start justify-start gap-1 md:gap-2">
                <span className="text-[#00e02b] text-[60px] sm:text-[75px] md:text-[95px] lg:text-[122px] font-bold leading-[1.1]">
                  MAGNO
                </span>
                <span className="text-white text-[60px] sm:text-[75px] md:text-[95px] lg:text-[122px] font-light leading-[1.1]">
                  3.0
                </span>
              </div>

              {/* Subtítulo */}
              <h2 className="text-white text-start text-[18px] sm:text-[22px] md:text-[28px] lg:text-[36px] font-light max-w-4xl mt-1 leading-[1.1]">
                Congreso Internacional de Odontología
              </h2>

              {/* Fecha y ubicación */}
              <div className="flex flex-wrap items-center justify-center text-[16px] sm:text-[18px] md:text-[24px] lg:text-[28px] mt-1 leading-[1.1]">
                <span className="text-[#05dd4d] font-extralight">
                  COLOMBIA 2025
                </span>
                <span className="text-[#05dd4d] mx-2 md:mx-4 font-extralight">
                  |
                </span>
                <span className="text-white">11 DE JUNIO 2025</span>
              </div>
            </div>

            {/* Botón de registro */}
            <button
              onClick={scrollToRegistro}
              className="mt-8 px-6 sm:px-8 md:px-20 py-2 sm:py-2 md:py-3 bg-[#15d094] text-[#01332b] rounded-full font-bold text-[14px] sm:text-[16px] md:text-[18px] hover:bg-[#12b07c] transition-colors duration-300"
            >
              Registrarme ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
