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
        <CardContent className="w-full h-full flex flex-col items-center gap-5 hover:gap-0 relative p-6 hover:p-0 group-hover:p-0 cursor-pointer ">

          <div className="relative w-52 h-52 flex justify-center items-center transition-all duration-300 group-hover:w-full group-hover:h-full">
            <div className="w-full h-full bg-white  flex justify-center items-center rounded-lg hover:rounded-lg">
              <Image
                src={image || "/placeholder.svg"}
                alt={name}
                fill
                className="object-contain transition-all duration-300 rounded-lg hover:rounded-lg"
              />
            </div>
          </div>

          <h3 className="text-xl font-bold text-white text-center transition-opacity duration-300 group-hover:invisible group-hover:h-0">
            {name}
          </h3>

        </CardContent>
      </Card>
    </>
  );

}
