"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface SpeakerCardProps {
  id: string
  name: string
  role: string
  image: string
  topic: string
  onOpenModal: () => void
}

export default function SpeakerCard({ id, name, role, image, topic, onOpenModal }: SpeakerCardProps) {
  return (
    <Card className="bg-[#001208] border-[#00FF66]/10 overflow-hidden hover:border-[#00FF66]/30 transition-all group shadow-lg">
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001208] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-[#00FF66] mb-4">{role}</p>
        <div className="inline-block px-3 py-1 rounded-full bg-[#00FF66]/20 text-[#00FF66] text-sm mb-4">{topic}</div>

        <Button
          variant="outline"
          size="sm"
          className="w-full border-[#00FF66]/30 text-white hover:bg-[#00FF66]/10 hover:border-[#00FF66]"
          onClick={onOpenModal}
        >
          <Eye className="mr-2 h-4 w-4" />
          Ver perfil completo
        </Button>
      </CardContent>
    </Card>
  )
}

