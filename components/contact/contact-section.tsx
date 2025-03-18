"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import RegistrationModal from "../registration/registration-modal"

export default function ContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="contacto" className="py-28 bg-gradient-to-b from-[#002A1A] to-[#001208] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1600')] bg-no-repeat bg-cover opacity-5"></div>
      </div>
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Contáctanos</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#00FF66]/50 to-[#00FF66]"></div>
            <p className="text-white/80 text-lg leading-relaxed">
              ¿Tienes alguna pregunta o necesitas más información? Nuestro equipo está listo para ayudarte. Completa el
              formulario de contacto y te responderemos a la brevedad.
            </p>

            <div className="pt-8">
              <Button
                size="lg"
                className="bg-[#00FF66] hover:bg-[#00DD55] text-[#001208] group px-8"
                onClick={() => setIsModalOpen(true)}
              >
                Formulario de Contacto
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00FF66]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#00FF66]/10 rounded-full blur-3xl"></div>
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Contacto"
              width={600}
              height={400}
              className="rounded-2xl object-cover shadow-2xl shadow-[#00FF66]/5 border border-[#00FF66]/10 relative z-10"
            />
          </div>
        </div>
      </div>

      {/* Modal de contacto (usando el mismo componente que el de registro) */}
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}

