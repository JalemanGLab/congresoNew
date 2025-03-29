"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import useProductCard from "./useProduct-card"

interface ProductCardProps {
  id: string
  name: string
  image: string
  description: string
  category: string
  features?: string[]
  specifications?: string[]
  brand?: string
}

export default function ProductCard({ 
  name, 
  image, 
  category,
}: ProductCardProps) {

  const {
    isModalOpen,
    setIsModalOpen
  } = useProductCard()

  return (
    <> 
      <Card className="bg-[#001208] min-w-[350px] max-w-[350px] h-[350px] border-[#00FF66]/10 overflow-hidden hover:border-[#00FF66]/30 transition-all group shadow-lg relative">
        <CardContent className="w-full h-full p-6 flex flex-col items-center justify-between relative">
          {/* Imagen con efecto de expansión */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="w-full h-full bg-white rounded-lg p-4">
              <div className="relative w-full h-full">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="relative w-40 h-40 group-hover:opacity-0 transition-all duration-500">
            <div className="w-full h-full bg-white rounded-2xl p-2">
              <div className="relative w-full h-full">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="w-full text-center group-hover:opacity-0 transition-all duration-500">
            <Badge variant="outline" className="mb-3 bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/20 px-3 py-1">
              {category}
            </Badge>
            <h3 className="text-xl font-bold text-white">{name}</h3>
          </div>
        </CardContent>
      </Card>

    </>
  )
}

