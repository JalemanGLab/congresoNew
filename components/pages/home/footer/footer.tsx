"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  const socialLinks = [
    { name: "Facebook", url: "https://facebook.com", icon: FaFacebookF },
    { name: "Twitter", url: "https://twitter.com", icon: FaTwitter },
    { name: "Instagram", url: "https://instagram.com", icon: FaInstagram },
    { name: "LinkedIn", url: "https://linkedin.com", icon: FaLinkedinIn },
  ];
  return (
    <footer className="py-16 bg-[#001208] border-t border-[#00FF66]/10">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center ">
              <Image
                src="/logo.png"
                alt="Solventum Logo"
                width={160}
                height={160}
                className="object-contain"
              />
            </div>
            <p className="text-white/60 leading-relaxed">
              Liderando el Congreso Magno 3.0, el evento más importante del año
              para profesionales y empresas del sector odontológico. Innovación,
              conocimiento y networking en un solo lugar.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ name, url, icon: Icon }) => (
                <Link
                  key={name}
                  href={url}
                  className="h-10 w-10 rounded-full bg-[#25D366]/10 flex items-center justify-center hover:bg-[#25D366]/20 transition-all duration-300 shadow-md"
                  aria-label={name}
                >
                  <Icon className="h-5 w-5 text-[#25D366] transition-transform duration-300 group-hover:scale-110" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium text-lg mb-6">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-4">
              {[
                "Inicio",
                "Evento",
                "Ponentes",
                "Productos",
                "FAQ",
                "Contacto",
              ].map((item) => (
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
              {[
                "Términos y Condiciones",
                "Política de Privacidad",
                "Política de Reembolso",
                "Aviso Legal",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
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
                <MapPin className="h-6 w-6 text-[#00FF66] mt-0.5" />
                <span className="text-white/60">
                  Centro de Convenciones, Bogotá, Colombia
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#00FF66]/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Congreso Magno 3.0 - Solventum. Todos
            los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-white/60 hover:text-[#00FF66] transition-colors text-sm"
            >
              Mapa del sitio
            </Link>
            <Link
              href="#"
              className="text-white/60 hover:text-[#00FF66] transition-colors text-sm"
            >
              Cookies
            </Link>
            <Link
              href="#"
              className="text-white/60 hover:text-[#00FF66] transition-colors text-sm"
            >
              Accesibilidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
