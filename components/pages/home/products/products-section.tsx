"use client"

import ProductFilters from "./product-filters/product-filters"
import ProductCard from "./product-card/product-card"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import useProductsSection, { productCategories } from "./useProducts-section"




export default function ProductsSection() {

  const {
    remainingCount,
    searchTerm,
    selectedCategory,
    visibleProducts,
    filteredProducts,
    showMore,
    setShowMore
  } = useProductsSection()

  return (
    <section id="productos" className="py-28 bg-gradient-to-b from-[#001810] to-[#002A1A] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1600')] bg-no-repeat bg-cover opacity-5"></div>
      </div>
      <div className="container relative ">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Productos Disponibles</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#00FF66]/50 to-[#00FF66] mx-auto mb-6"></div>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            Descubre los productos odontológicos más innovadores que estarán disponibles en el Congreso Magno 3.0.
            Utiliza los filtros para encontrar exactamente lo que necesitas.
          </p>
        </div>

        {/* Product Filters */}
        <ProductFilters categories={Object.keys(productCategories)} />

        {/* Product Grid */}
        <div className="mt-12">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-[#001208]/80 backdrop-blur-sm rounded-2xl border border-[#00FF66]/20 shadow-xl">
              <p className="text-white text-lg">No se encontraron productos que coincidan con los criterios de búsqueda.</p>
              <p className="text-white/70 mt-2">Intenta con otros filtros o términos de búsqueda.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {visibleProducts.map((product) => (
                  <div key={product.id} className="flex">
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>

              {/* Ver más/menos buttons */}
              {remainingCount > 0 && !showMore && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    className="border-[#00FF66]/30 text-white hover:bg-[#00FF66]/10 hover:border-[#00FF66] transition-colors duration-200"
                    onClick={() => setShowMore(true)}
                  >
                    Ver más ({remainingCount} productos)
                  </Button>
                </div>
              )}

              {showMore && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    className="border-[#00FF66]/30 text-white hover:bg-[#00FF66]/10 hover:border-[#00FF66] transition-colors duration-200"
                    onClick={() => setShowMore(false)}
                  >
                    Ver menos
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

