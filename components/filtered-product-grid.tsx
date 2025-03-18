"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { ChevronDown } from "lucide-react"

// Datos de productos
const allProducts = [
  {
    id: "product1",
    name: "Z350XT Kit Introductorio",
    image: "/placeholder.svg?height=200&width=200",
    description: "Kit completo con jeringas de todos los tonos esenciales",
    category: "Restauración",
  },
  {
    id: "product2",
    name: "Z350XT Jeringa Individual",
    image: "/placeholder.svg?height=200&width=200",
    description: "Jeringa individual de resina compuesta Z350XT para reposición",
    category: "Restauración",
  },
  {
    id: "product3",
    name: "Z350XT Flow",
    image: "/placeholder.svg?height=200&width=200",
    description: "Resina fluida con la misma tecnología de nanorelleno para áreas de difícil acceso",
    category: "Restauración",
  },
  {
    id: "product4",
    name: "Clarity Advance Kit Completo",
    image: "/placeholder.svg?height=200&width=200",
    description: "Kit completo de brackets cerámicos para tratamiento de arco completo",
    category: "Ortodoncia",
  },
  {
    id: "product5",
    name: "Clarity Advance Arcos Estéticos",
    image: "/placeholder.svg?height=200&width=200",
    description: "Arcos recubiertos estéticos para complementar el sistema Clarity Advance",
    category: "Ortodoncia",
  },
  {
    id: "product6",
    name: "Clarity Ultra Kit Autoligable",
    image: "/placeholder.svg?height=200&width=200",
    description: "Sistema completo de brackets cerámicos autoligables de última generación",
    category: "Ortodoncia",
  },
  {
    id: "product7",
    name: "Clarity Ultra Herramientas",
    image: "/placeholder.svg?height=200&width=200",
    description: "Set de herramientas especializadas para el manejo del sistema Clarity Ultra",
    category: "Ortodoncia",
  },
  {
    id: "product8",
    name: "SBU+ Kit Introductorio",
    image: "/placeholder.svg?height=200&width=200",
    description: "Kit completo con adhesivo Single Bond Universal Plus y cemento RelyX",
    category: "Adhesivos",
  },
  {
    id: "product9",
    name: "RelyX Universal Clicker",
    image: "/placeholder.svg?height=200&width=200",
    description: "Dispensador tipo clicker para cemento RelyX Universal con dosificación precisa",
    category: "Cementos",
  },
  {
    id: "product10",
    name: "Clinpro Clear Kit Preventivo",
    image: "/placeholder.svg?height=200&width=200",
    description: "Kit completo para prevención y remineralización de lesiones incipientes",
    category: "Prevención",
  },
  {
    id: "product11",
    name: "Clinpro Clear Sellante",
    image: "/placeholder.svg?height=200&width=200",
    description: "Sellante de fosas y fisuras fotocurable con liberación de flúor",
    category: "Prevención",
  },
  {
    id: "product12",
    name: "Easy Match Kit Digital",
    image: "/placeholder.svg?height=200&width=200",
    description: "Sistema digital para selección precisa de color en restauraciones estéticas",
    category: "Estética",
  },
  {
    id: "product13",
    name: "Easy Match Guía Física",
    image: "/placeholder.svg?height=200&width=200",
    description: "Guía física de colores fabricada con las resinas originales para comparación directa",
    category: "Estética",
  },
  {
    id: "product14",
    name: "Easy Match App Pro",
    image: "/placeholder.svg?height=200&width=200",
    description: "Aplicación profesional para smartphones que permite selección de color mediante fotografía",
    category: "Estética",
  },
]

export default function FilteredProductGrid() {
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [visibleProducts, setVisibleProducts] = useState<typeof allProducts>([])
  const [showMore, setShowMore] = useState(false)
  const productsPerPage = 10

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

