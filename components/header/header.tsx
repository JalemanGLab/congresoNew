"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#00FF66]/10 bg-[#001208]/95 backdrop-blur supports-[backdrop-filter]:bg-[#001208]/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden">
            <Image src="/solventum-logo.svg" alt="Solventum Logo" fill className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#00FF66]">Solventum</span>
            <span className="text-xs text-white/50">Congreso Magno 3.0</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: "Inicio", href: "#inicio" },
            { name: "Evento", href: "#evento" },
            { name: "Agenda", href: "#agenda" },
            { name: "Ponentes", href: "#ponentes" },
            { name: "Productos", href: "#productos" },
            { name: "FAQ", href: "#preguntas" },
            { name: "Contacto", href: "#contacto" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-white/70 hover:text-[#00FF66] transition-colors relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00FF66] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-[#00FF66]/30 text-white hover:bg-[#00FF66]/10 hover:border-[#00FF66]"
          >
            Iniciar Sesión
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden border-[#00FF66]/30 text-white hover:bg-[#00FF66]/10 hover:border-[#00FF66]"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Menu</span>
        </Button>
      </div>
    </header>
  )
}

