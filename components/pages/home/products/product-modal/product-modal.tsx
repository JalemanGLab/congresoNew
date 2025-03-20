"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface ProductModalProps {
  id: string
  name: string
  image: string
  description: string
  category: string
  features: string[]
  specifications: string[]
  brand: string
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({
  id,
  name,
  image,
  description,
  category,
  features,
  specifications,
  brand,
  isOpen,
  onClose,
}: ProductModalProps) {
  // Controlar el overflow del body cuando el modal está abierto
  useEffect(() => {
    const html = document.documentElement
    if (isOpen) {
      html.classList.add('overflow-hidden')
      html.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
    } else {
      html.classList.remove('overflow-hidden')
      html.style.paddingRight = ''
    }
    return () => {
      html.classList.remove('overflow-hidden')
      html.style.paddingRight = ''
    }
  }, [isOpen])

  // Asegurarse de que el modal se cierre cuando se presiona Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="bg-[#001208] pt-8 overflow-x-hidden rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#00FF66]/20 shadow-2xl relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 md:top-4 md:right-4 text-white hover:bg-[#00FF66]/10 z-10"
          onClick={onClose}
        >
          <X className="h-5 w-5 md:h-6 md:w-6" />
        </Button>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8 p-4 md:p-8">
          <div className="space-y-4 md:space-y-6">
            <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden bg-[#002A1A] flex items-center justify-center p-4 md:p-8">
              <Image
                src={image || "/placeholder.svg"}
                alt={name}
                width={300}
                height={300}
                className="object-contain max-h-full w-auto"
              />
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div>
              <Badge variant="outline" className="mb-2 md:mb-3 bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/20 px-2 py-0.5 md:px-3 md:py-1 text-sm">
                {category}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">{name}</h2>
            </div>

            <div className="h-1 w-16 md:w-20 bg-[#00FF66]/50"></div>

            <div>
              <h3 className="text-lg md:text-xl font-medium text-white mb-2 md:mb-3">Descripción</h3>
              <p className="text-sm md:text-base text-white/80 leading-relaxed">{description}</p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-medium text-white mb-2 md:mb-3">Características</h3>
              <ul className="space-y-1.5 md:space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-4 md:h-5 w-4 md:w-5 rounded-full bg-[#00FF66]/20 flex items-center justify-center mt-0.5">
                      <div className="h-1.5 md:h-2 w-1.5 md:w-2 rounded-full bg-[#00FF66]"></div>
                    </div>
                    <span className="text-sm md:text-base text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-4 md:mt-6">
              <Button className="w-full md:flex-1 bg-[#00FF66] hover:bg-[#00DD55] text-[#001208] text-sm md:text-base py-5 md:py-6">
                Solicitar información
              </Button>
              <Button
                variant="outline"
                className="w-full md:flex-1 border-[#00FF66]/30 text-white hover:bg-[#00FF66]/10 hover:border-[#00FF66] text-sm md:text-base py-5 md:py-6"
              >
                Ver demostración
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

