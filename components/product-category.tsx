"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import ProductModal from "@/components/product-modal"

interface Product {
  id: string
  name: string
  image: string
  description: string
  category: string
  features: string[]
  specifications: string[]
  brand: string
}

interface ProductCategoryProps {
  title: string
  description: string
  products: Product[]
}

export default function ProductCategory({ title, description, products }: ProductCategoryProps) {
  const [expanded, setExpanded] = useState(false)
  const initialProductsToShow = 3

  // Determine if we need to show the "Ver más" button
  const hasMoreProducts = products.length > initialProductsToShow

  // Determine which products to show based on expanded state
  const visibleProducts = expanded ? products : products.slice(0, initialProductsToShow)

  return (
    <div className="bg-[#001208]/80 backdrop-blur-sm rounded-2xl border border-[#00FF66]/20 shadow-xl overflow-hidden">
      <div className="p-8 border-b border-[#00FF66]/10">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/80 text-lg">{description}</p>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              description={product.description}
              category={product.category}
            />
          ))}
        </div>

        {hasMoreProducts && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              className="border-[#00FF66]/30 text-white hover:bg-[#00FF66]/10 hover:border-[#00FF66]"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  Ver menos
                  <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Ver más
                  <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Render modals for all products in this category */}
      {products.map((product) => (
        <ProductModal
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.image}
          description={product.description}
          category={product.category}
          features={product.features}
          specifications={product.specifications}
          brand={product.brand}
        />
      ))}
    </div>
  )
}

