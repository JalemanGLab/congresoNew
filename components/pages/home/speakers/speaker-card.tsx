"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface SpeakerCardProps {
  id: string
  name: string
  role: string
  image: string
  topic: string
  country: string
  onOpenModal: () => void
}

const getCountryFlag = (country: string): string => {
  const flags: { [key: string]: string } = {
    'Brasil': 'https://flagcdn.com/40x30/br.png',
    'Chile': 'https://flagcdn.com/40x30/cl.png',
    'Colombia': 'https://flagcdn.com/40x30/co.png'
  }
  return flags[country] || ''
}

export default function SpeakerCard({ id, name, role, image, topic, country, onOpenModal }: SpeakerCardProps) {
  return (
    <div className="max-w-[310px] min-w-[310px] rounded-lg overflow-hidden hover:border-[#00FF66]/30 transition-all group ">
      <div className="relative h-80 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className=" transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001208] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-start gap-2  mb-1">
            <img src={getCountryFlag(country)} alt="Bandera" width="30" className="pt-2"/>
          <h3 className="text-xl font-bold text-white">{name}</h3>
        </div>
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
      </div>
    </div>
  )
}

