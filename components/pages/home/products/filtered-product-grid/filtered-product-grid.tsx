"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import ProductCard from "../product-card/product-card"
import { ChevronDown } from "lucide-react"
import useFiltered from "./useFiltered-product-grid"

// Datos de productos con las nuevas categorías

export default function FilteredProductGrid() {

  const {
    filteredProducts,
    productsPerPage,
    setShowMore,
    showMore,
    visibleProducts
  } = useFiltered()
  
  return (
    <div className="space-y-8">
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-[#001208]/80 backdrop-blur-sm rounded-2xl border border-[#00FF66]/20 shadow-xl">
          <p className="text-white text-lg">No se encontraron productos que coincidan con los criterios de búsqueda.</p>
          <p className="text-white/70 mt-2">Intenta con otros filtros o términos de búsqueda.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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

          {filteredProducts.length > productsPerPage && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="border-[#00FF66]/30 text-white hover:bg-[#00FF66]/10 hover:border-[#00FF66]"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Ver menos" : `Ver más (${filteredProducts.length - productsPerPage} restantes)`}
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showMore ? "rotate-180" : ""}`} />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

