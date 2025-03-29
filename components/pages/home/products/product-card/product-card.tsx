"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import useProductCard from "./useProduct-card"

interface ProductCardProps {
  id: string
  name: string
  image: string
  description: string
  brand?: string
}

export default function ProductCard({
  name,
  image,
}: ProductCardProps) {

  const {
    isModalOpen,
    setIsModalOpen
  } = useProductCard()

  return (
    <>
      <Card className="bg-[#001208] min-w-[320px] max-w-[320px] h-[320px] border-[#00FF66]/10 overflow-hidden hover:border-[#00FF66]/30 transition-all group shadow-lg relative">
        <CardContent className="w-full h-full p-6 flex flex-col items-center gap-5 relative">
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

          <div className="relative w-52 h-52 group-hover:opacity-0 transition-all duration-500">
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
          <h3 className="text-xl font-bold text-white text-center">{name}</h3>
        </CardContent>
      </Card>
    </>
  )
}

