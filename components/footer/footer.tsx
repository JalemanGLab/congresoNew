"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-16 bg-[#001208] border-t border-[#00FF66]/10">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden">
                <Image src="/solventum-logo.svg" alt="Solventum Logo" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#00FF66]">Solventum</span>
                <span className="text-sm text-white/50">Congreso Magno 3.0</span>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed">
              Liderando el Congreso Magno 3.0, el evento más importante del año para profesionales y empresas del sector
              odontológico. Innovación, conocimiento y networking en un solo lugar.
            </p>
            <div className="flex gap-4">
              {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                <Link
                  key={social}
                  href={`https://${social}.com`}
                  className="h-10 w-10 rounded-full bg-[#00FF66]/10 flex items-center justify-center hover:bg-[#00FF66]/20 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <Image src={`/${social}-icon.svg`} alt={social} width={20} height={20} className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium text-lg mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-4">
              {["Inicio", "Evento", "Ponentes", "Productos", "FAQ", "Contacto"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-white/60 hover:text-[#00FF66] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium text-lg mb-6">Legal</h3>
            <ul className="space-y-4">
              {["Términos y Condiciones", "Política de Privacidad", "Política de Reembolso", "Aviso Legal"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-white/60 hover:text-[#00FF66] transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium text-lg mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#00FF66] mt-0.5" />
                <span className="text-white/60">info@congresomagno.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#00FF66] mt-0.5" />
                <span className="text-white/60">+57 123 456 7890</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#00FF66] mt-0.5" />
                <span className="text-white/60">Centro de Convenciones, Bogotá, Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#00FF66]/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Congreso Magno 3.0 - Solventum. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-white/60 hover:text-[#00FF66] transition-colors text-sm">
              Mapa del sitio
            </Link>
            <Link href="#" className="text-white/60 hover:text-[#00FF66] transition-colors text-sm">
              Cookies
            </Link>
            <Link href="#" className="text-white/60 hover:text-[#00FF66] transition-colors text-sm">
              Accesibilidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

