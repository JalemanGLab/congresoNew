"use client"

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import ProductModal from "./product-modal"

interface ProductCardProps {
  id: string
  name: string
  image: string
  description: string
  category: string
}

export default function ProductCard({ id, name, image, description, category }: ProductCardProps) {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <>
      <Card className="bg-[#001208] border-[#00FF66]/10 overflow-hidden hover:border-[#00FF66]/30 transition-all group shadow-lg h-full flex flex-col">
        <CardContent className="p-8 flex flex-col items-center text-center flex-grow">
          <div className="flex flex-col items-center justify-center flex-grow">
            <div className="h-32 w-32 relative mb-6 group-hover:scale-105 transition-transform">
              <div className="w-full h-full relative">
                <img
                  src={image}
                  alt={name}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            <Badge
              variant="outline"
              className="mb-4 bg-[#00FF66]/10 text-[#00FF66] border-[#00FF66]/20 px-3 py-1"
            >
              {category}
            </Badge>
            <h3 className="text-xl font-semibold text-white mb-3">{name}</h3>
          </div>
          <div className="mt-auto">
            <Button
              variant="outline"
              size="sm"
              className="border-[#00FF66]/30 text-white hover:bg-[#00FF66]/10 hover:border-[#00FF66]"
              onClick={() => setSelectedProduct(id)}
            >
              <Eye className="mr-2 h-4 w-4" />
              Ver detalles
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Product Modal */}
      <ProductModal
        id={id}
        name={name}
        image={image}
        description={description}
        category={category}
        isOpen={selectedProduct === id}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
