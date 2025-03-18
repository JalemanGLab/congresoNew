"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function RegistrationModal({ isOpen, onClose, children }: RegistrationModalProps) {
  // Cerrar el modal con la tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = "hidden"
    }

    return () => {
      window.removeEventListener("keydown", handleEscape)
      // Restaurar scroll cuando el componente se desmonta
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg w-[96vw] max-w-[1000px] h-96 relative"
        onClick={(e) => e.stopPropagation()} // Prevenir que clics en el modal cierren el modal
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-gray-500 hover:bg-gray-100 z-10"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        {children}
      </div>
    </div>
  )
}

