"use client"
import { Calendar, Clock, MapPin, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import RegisterForm from "../../../custom/modals/register/RegisterForm"

export default function RegistrationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  // Mejorar el manejo del scroll
  useEffect(() => {
    if (isModalOpen) {
      // Capturar la posición actual del scroll
      const currentScrollPosition = window.scrollY
      setScrollPosition(currentScrollPosition)
      
      // Fijar el body en su posición actual
      document.body.style.top = `-${currentScrollPosition}px`
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Restaurar estilos
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      
      // Restaurar la posición del scroll
      window.scrollTo({
        top: scrollPosition,
        behavior: 'instant' // Asegura que no haya animación
      })
    }

    return () => {
      // Limpieza
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  return (
    <section id="registro" className="py-28 bg-gradient-to-b from-[#001208] to-[#002A1A] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1600')] bg-no-repeat bg-cover opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#001208] via-transparent to-[#002A1A]/80"></div>
      </div>
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#00FF66]/20 text-[#00FF66] font-medium text-sm mb-4">
              15 DE JULIO, 2025
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Regístrate para el <span className="text-[#00FF66] block">Congreso Magno 3.0</span>
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Asegura tu lugar en el evento más importante del año para profesionales de la odontología. Plazas
              limitadas disponibles. Aprovecha nuestras tarifas especiales por registro anticipado.
            </p>

            {/* Event Info Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-[#001208]/80 backdrop-blur-sm p-6 rounded-xl border border-[#00FF66]/20 shadow-lg flex flex-col items-center text-center group hover:border-[#00FF66]/40 transition-all">
                <div className="h-14 w-14 rounded-full bg-[#00FF66]/10 flex items-center justify-center mb-4 group-hover:bg-[#00FF66]/20 transition-colors">
                  <Calendar className="h-7 w-7 text-[#00FF66]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">Fecha</h3>
                <p className="text-white/80">15 de Julio, 2025</p>
              </div>

              <div className="bg-[#001208]/80 backdrop-blur-sm p-6 rounded-xl border border-[#00FF66]/20 shadow-lg flex flex-col items-center text-center group hover:border-[#00FF66]/40 transition-all">
                <div className="h-14 w-14 rounded-full bg-[#00FF66]/10 flex items-center justify-center mb-4 group-hover:bg-[#00FF66]/20 transition-colors">
                  <Clock className="h-7 w-7 text-[#00FF66]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">Horario</h3>
                <p className="text-white/80">9:00 AM - 6:00 PM</p>
              </div>

              <div className="bg-[#001208]/80 backdrop-blur-sm p-6 rounded-xl border border-[#00FF66]/20 shadow-lg flex flex-col items-center text-center group hover:border-[#00FF66]/40 transition-all">
                <div className="h-14 w-14 rounded-full bg-[#00FF66]/10 flex items-center justify-center mb-4 group-hover:bg-[#00FF66]/20 transition-colors">
                  <MapPin className="h-7 w-7 text-[#00FF66]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">Ubicación</h3>
                <p className="text-white/80">Centro de Convenciones, Bogotá</p>
              </div>

              <div className="bg-[#001208]/80 backdrop-blur-sm p-6 rounded-xl border border-[#00FF66]/20 shadow-lg flex flex-col items-center text-center group hover:border-[#00FF66]/40 transition-all">
                <div className="h-14 w-14 rounded-full bg-[#00FF66]/10 flex items-center justify-center mb-4 group-hover:bg-[#00FF66]/20 transition-colors">
                  <Ticket className="h-7 w-7 text-[#00FF66]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">Entradas</h3>
                <p className="text-white/80">Limitadas (1000 disponibles)</p>
              </div>
            </div>

            {/* Se eliminaron los botones de esta sección */}
          </div>

          {/* Registration Info */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00FF66]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#00FF66]/10 rounded-full blur-3xl"></div>
            <div className="relative bg-[#001208] border border-[#00FF66]/20 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Beneficios de registro anticipado</h3>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#00FF66]/20 flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-[#00FF66]"></div>
                  </div>
                  <span className="text-white/80">Acceso prioritario a todas las conferencias</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#00FF66]/20 flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-[#00FF66]"></div>
                  </div>
                  <span className="text-white/80">Material exclusivo del evento</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#00FF66]/20 flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-[#00FF66]"></div>
                  </div>
                  <span className="text-white/80">Descuentos en productos odontológicos</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#00FF66]/20 flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-[#00FF66]"></div>
                  </div>
                  <span className="text-white/80">Networking con ponentes internacionales</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#00FF66]/20 flex items-center justify-center mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-[#00FF66]"></div>
                  </div>
                  <span className="text-white/80">Valor redimible en productos odontológicos</span>
                </li>
              </ul>

              <div className="pt-6 border-t border-[#00FF66]/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/70">Precio regular</span>
                  <span className="text-white/70 line-through">$650.000 COP</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-white font-medium">Precio anticipado</span>
                  <span className="text-[#00FF66] font-bold text-xl">$500.000 COP</span>
                </div>
                <Button
                  className="w-full bg-[#00FF66] hover:bg-[#00DD55] text-[#001208]"
                  onClick={() => setIsModalOpen(true)}
                >
                  Registrarme
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reemplazar el modal anterior con este nuevo */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl p-8 shadow-xl w-full max-w-4xl m-4 h-[90vh] overflow-y-auto
            scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 border border-gray-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <RegisterForm />
          </div>
        </div>
      )}
    </section>
  )
}

