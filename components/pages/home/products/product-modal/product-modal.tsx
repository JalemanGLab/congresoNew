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
  name,
  image,
  description,
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">{name}</h2>
            </div>

            <div className="h-1 w-16 md:w-20 bg-[#00FF66]/50"></div>

            <div>
              <h3 className="text-lg md:text-xl font-medium text-white mb-2 md:mb-3">Descripción</h3>
              <p className="text-sm md:text-base text-white/80 leading-relaxed">{description}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

