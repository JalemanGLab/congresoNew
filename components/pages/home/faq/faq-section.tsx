"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Faq from "../../../custom/modals/faq/Faq";
import useFaqSection from "./useFaq-section";

export default function FaqSection() {
  const { Render, toggleModal, closeModalAction } = useFaqSection();

  return (
    <section
      id="preguntas"
      className="py-16 lg:py-20 bg-[#002A1A] relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1600')] bg-no-repeat bg-cover opacity-5"></div>
      </div>
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-20 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Preguntas <span className="text-[#00FF66]">Frecuentes</span>
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-[#00FF66]/50 to-[#00FF66]"></div>
            <p className="text-white/80 text-base leading-relaxed">
              ¿Tienes dudas sobre el Congreso Magno 3.0? Consulta nuestra
              sección de preguntas frecuentes donde encontrarás toda la
              información que necesitas sobre inscripciones, agenda, ponentes y
              más.
            </p>
            <div className="pt-4">
              <Button
                size="default"
                className="bg-[#00FF66] hover:bg-[#00DD55] text-[#001208] group px-6"
                onClick={toggleModal}
              >
                Ver Preguntas Frecuentes
                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-[#00FF66]/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#00FF66]/10 rounded-full blur-2xl"></div>
            <Image
              src="https://jmpukiohbcemfjqcsikc.supabase.co/storage/v1/object/sign/question/001.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJxdWVzdGlvbi8wMDEud2VicCIsImlhdCI6MTc0MzQ5MDY3MCwiZXhwIjoxNzc1MDI2NjcwfQ.wDQ2zXkdCzd1UDtUHV1eRMOit2FlgxIEzFn1Akn2T4k"
              alt="Preguntas frecuentes"
              width={500}
              height={333}
              className="rounded-xl object-cover shadow-xl shadow-[#00FF66]/5 border border-[#00FF66]/10 relative z-10"
              priority
            />
          </div>
        </div>
      </div>

      <Render>
        <Faq onClose={closeModalAction} />
      </Render>
    </section>
  );
}
