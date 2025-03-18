"use client"

import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export default function EventSection() {
  return (
    <section id="evento" className="py-28 bg-gradient-to-b from-[#002A1A] to-[#001810] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1600')] bg-no-repeat bg-cover opacity-5"></div>
      </div>
      <div className="container relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Sobre el Evento</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#00FF66]/50 to-[#00FF66] mx-auto mb-6"></div>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            El Congreso Magno 3.0 es el evento más importante del año para profesionales y empresas que buscan innovar y
            crecer en el mercado actual.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl overflow-hidden h-[500px] relative order-1 shadow-2xl shadow-[#00FF66]/5 border border-[#00FF66]/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254508.51141489705!2d-74.29357849553887!3d4.648618591112939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2zQm9nb3TDoSwgQ29sb21iaWE!5e0!3m2!1sen!2sus!4v1710702296299!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>
          <div className="space-y-8 order-2">
            <h3 className="text-3xl font-bold text-white">Un evento diseñado para profesionales</h3>
            <p className="text-white/80 text-lg leading-relaxed">
              El Congreso Magno 3.0 reúne a los mejores profesionales del sector odontológico para compartir
              conocimientos, experiencias y las últimas tendencias en tecnología y procedimientos.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#001208] p-6 rounded-xl border border-[#00FF66]/10 shadow-lg">
                <h4 className="text-[#00FF66] font-medium mb-3 text-lg">Conferencias</h4>
                <p className="text-white/70">Ponencias de expertos nacionales e internacionales</p>
              </div>
              <div className="bg-[#001208] p-6 rounded-xl border border-[#00FF66]/10 shadow-lg">
                <h4 className="text-[#00FF66] font-medium mb-3 text-lg">Workshops</h4>
                <p className="text-white/70">Talleres prácticos con las últimas técnicas</p>
              </div>
              <div className="bg-[#001208] p-6 rounded-xl border border-[#00FF66]/10 shadow-lg">
                <h4 className="text-[#00FF66] font-medium mb-3 text-lg">Networking</h4>
                <p className="text-white/70">Oportunidades para conectar con colegas</p>
              </div>
              <div className="bg-[#001208] p-6 rounded-xl border border-[#00FF66]/10 shadow-lg">
                <h4 className="text-[#00FF66] font-medium mb-3 text-lg">Exposición</h4>
                <p className="text-white/70">Muestra de productos y servicios innovadores</p>
              </div>
            </div>
            <div className="pt-4">
              <Button className="w-full bg-[#00FF66] hover:bg-[#00DD55] text-[#001208] group">
                Cómo Llegar
                <MapPin className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

