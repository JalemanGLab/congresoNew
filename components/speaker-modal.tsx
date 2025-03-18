"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface SpeakerModalProps {
  id: string
  name: string
  role: string
  image: string
  topic: string
  bio: string
  schedule: string
  location: string
  achievements: string[]
}

export default function SpeakerModal({
  id,
  name,
  role,
  image,
  topic,
  bio,
  schedule,
  location,
  achievements,
}: SpeakerModalProps) {
  // Asegurarse de que el modal se cierre cuando se presiona Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const modal = document.getElementById(id)
        if (modal && !modal.classList.contains("hidden")) {
          modal.classList.add("hidden")
          document.body.style.overflow = "auto"
        }
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [id])

  return (
    <div
      id={id}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          document.getElementById(id)?.classList.add("hidden")
          document.body.style.overflow = "auto"
        }
      }}
    >
      <div className="bg-[#001208] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#00FF66]/20 shadow-2xl relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-[#00FF66]/10 z-10"
          onClick={() => {
            document.getElementById(id)?.classList.add("hidden")
            document.body.style.overflow = "auto"
          }}
        >
          <X className="h-6 w-6" />
        </Button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="space-y-6">
            <div className="relative h-80 w-full rounded-xl overflow-hidden">
              <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
            </div>

            <div className="bg-[#002A1A] p-6 rounded-xl border border-[#00FF66]/10">
              <h3 className="text-white font-medium mb-4">Detalles de la conferencia</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Tema:</span>
                  <span className="text-white font-medium">{topic}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Horario:</span>
                  <span className="text-white font-medium">{schedule}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Ubicación:</span>
                  <span className="text-white font-medium">{location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">{name}</h2>
              <p className="text-[#00FF66] text-lg">{role}</p>
            </div>

            <div className="h-1 w-20 bg-[#00FF66]/50"></div>

            <div>
              <h3 className="text-xl font-medium text-white mb-3">Biografía</h3>
              <p className="text-white/80 leading-relaxed">{bio}</p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-white mb-3">Logros</h3>
              <ul className="space-y-2">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-[#00FF66]/20 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-[#00FF66]"></div>
                    </div>
                    <span className="text-white/80">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button className="w-full bg-[#00FF66] hover:bg-[#00DD55] text-[#001208] mt-4">
              Agendar esta conferencia
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

