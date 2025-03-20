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
      <div className="bg-[#001208] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#00FF66]/20 shadow-2xl relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-[#00FF66]/10 z-10"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="space-y-6">
            <div className="relative h-80 w-full rounded-xl overflow-hidden bg-[#002A1A] flex items-center justify-center p-8">
              <Image
                src={image || "/placeholder.svg"}
                alt={name}
                width={300}
                height={300}
                className="object-contain max-h-full"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-3 bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/20 px-3 py-1">
                {category}
              </Badge>
              <h2 className="text-3xl font-bold text-white mb-4">{name}</h2>
            </div>

            <div className="h-1 w-20 bg-[#00FF66]/50"></div>

            <div>
              <h3 className="text-xl font-medium text-white mb-3">Descripción</h3>
              <p className="text-white/80 leading-relaxed">{description}</p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-white mb-3">Características</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-[#00FF66]/20 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-[#00FF66]"></div>
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 mt-6">
              <Button className="flex-1 bg-[#00FF66] hover:bg-[#00DD55] text-[#001208]">
                Solicitar información
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#00FF66]/30 text-white hover:bg-[#00FF66]/10 hover:border-[#00FF66]"
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

