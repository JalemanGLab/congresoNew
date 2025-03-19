"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  image: string
  description: string
  category: string
}

export default function ProductCard({ id, name, image, description, category }: ProductCardProps) {
  return (
    <Card className="bg-[#001208] border-[#00FF66]/10 overflow-hidden hover:border-[#00FF66]/30 transition-all group shadow-lg">
      <CardContent className="p-8 flex flex-col items-center text-center">
        <div className="h-28 w-28 relative mb-6 group-hover:scale-105 transition-transform">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-contain" />
        </div>
        <Badge variant="outline" className="mb-4 bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/20 px-3 py-1">
          {category}
        </Badge>
        <h3 className="text-xl font-bold text-white mb-3">{name}</h3>
        <p className="text-white/70 mb-6">{description}</p>

        <Button
          variant="outline"
          size="sm"
          className="border-[#00FF66]/30 text-white hover:bg-[#00FF66]/10 hover:border-[#00FF66] mt-auto"
          onClick={() => {
            const modal = document.getElementById(id)
            if (modal) {
              modal.classList.remove("hidden")
              document.body.style.overflow = "hidden"
            }
          }}
        >
          <Eye className="mr-2 h-4 w-4" />
          Ver detalles
        </Button>
      </CardContent>
    </Card>
  )
}

