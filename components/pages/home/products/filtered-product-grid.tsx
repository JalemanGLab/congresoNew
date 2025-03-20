"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import ProductCard from "./product-card"
import { ChevronDown } from "lucide-react"
import allProducts from "../data/allProducts.json"

export default function FilteredProductGrid() {
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [visibleProducts, setVisibleProducts] = useState<typeof allProducts>([])
  const [showMore, setShowMore] = useState(false)
  const productsPerPage = 8

  // Función para filtrar productos
  const filterProducts = (category: string | null, searchTerm: string) => {
    let filtered = [...allProducts]

    // Filtrar por categoría
    if (category) {
      filtered = filtered.filter((product) => product.category === category)
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term),
      )
    }

    setFilteredProducts(filtered)
    setShowMore(false)
  }

  // Actualizar productos visibles cuando cambian los filtros o se hace clic en "Ver más"
  useEffect(() => {
    setVisibleProducts(showMore ? filteredProducts : filteredProducts.slice(0, productsPerPage))
  }, [filteredProducts, showMore])

  // Escuchar eventos de cambio de filtro
  useEffect(() => {
    const handleFilterChange = (e: Event) => {
      const customEvent = e as CustomEvent
      const { category, searchTerm } = customEvent.detail
      filterProducts(category, searchTerm)
    }

    window.addEventListener("filterChange", handleFilterChange as EventListener)
    return () => {
      window.removeEventListener("filterChange", handleFilterChange as EventListener)
    }
  }, [])

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

