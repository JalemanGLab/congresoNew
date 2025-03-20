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
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({
  id,
  name,
  image,
  description,
  category,
  isOpen,
  onClose,
}: ProductModalProps) {

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
	<div
		id={id}
		className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
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
          </div>
        </div>
      </div>
    </div>
  )
}
