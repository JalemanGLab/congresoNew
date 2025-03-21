"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import RegistrationModal from "../registration/registration-modal";
import Faq from "../../../custom/modals/faq/Faq";
import useFaqSection from "./useFaq-section";

export default function FaqSection() {
  const { Render, closeModalAction, toggleModal, isModalOpen, setIsModalOpen } = useFaqSection();

  return (
    <section
      id="preguntas"
      className="py-28 bg-[#002A1A] relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1600')] bg-no-repeat bg-cover opacity-5"></div>
      </div>
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Preguntas <span className="text-[#00FF66]">Frecuentes</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#00FF66]/50 to-[#00FF66]"></div>
            <p className="text-white/80 text-lg leading-relaxed">
              ¿Tienes dudas sobre el Congreso Magno 3.0? Consulta nuestra
              sección de preguntas frecuentes donde encontrarás toda la
              información que necesitas sobre inscripciones, agenda, ponentes y
              más.
            </p>
            <div className="pt-8">
              <Button
                size="lg"
                className="bg-[#00FF66] hover:bg-[#00DD55] text-[#001208] group px-8"
                onClick={toggleModal}
              >
                Ver Preguntas Frecuentes
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00FF66]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#00FF66]/10 rounded-full blur-3xl"></div>
            <Image
              src="/img/fq.PNG?height=600&width=800"
              alt="Preguntas frecuentes"
              width={600}
              height={400}
              className="rounded-2xl object-cover shadow-2xl shadow-[#00FF66]/5 border border-[#00FF66]/10 relative z-10"
            />
          </div>
        </div>
      </div>

      <Render>
        <Faq />
      </Render>

    </section>
  );
}
