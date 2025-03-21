import { useEffect, useState } from "react"

const allProducts = [
    {
      id: "product1",
      name: "Z350XT Kit Introductorio",
      image: "/placeholder.svg?height=200&width=200",
      description: "Kit completo con jeringas de todos los tonos esenciales",
      category: "Z350XT",
    },
    {
      id: "product2",
      name: "Z350XT Jeringa Individual",
      image: "/placeholder.svg?height=200&width=200",
      description: "Jeringa individual de resina compuesta Z350XT para reposición",
      category: "Z350XT",
    },
    {
      id: "product3",
      name: "Z350XT Flow",
      image: "/placeholder.svg?height=200&width=200",
      description: "Resina fluida con la misma tecnología de nanorelleno para áreas de difícil acceso",
      category: "Z350XT",
    },
    {
      id: "product4",
      name: "Clarity Advance Kit Completo",
      image: "/placeholder.svg?height=200&width=200",
      description: "Kit completo de brackets cerámicos para tratamiento de arco completo",
      category: "Clarity advance",
    },
    {
      id: "product5",
      name: "Clarity Advance Arcos Estéticos",
      image: "/placeholder.svg?height=200&width=200",
      description: "Arcos recubiertos estéticos para complementar el sistema Clarity Advance",
      category: "Clarity advance",
    },
    {
      id: "product6",
      name: "Clarity Ultra Kit Autoligable",
      image: "/placeholder.svg?height=200&width=200",
      description: "Sistema completo de brackets cerámicos autoligables de última generación",
      category: "Clarity ultra",
    },
    {
      id: "product7",
      name: "Clarity Ultra Herramientas",
      image: "/placeholder.svg?height=200&width=200",
      description: "Set de herramientas especializadas para el manejo del sistema Clarity Ultra",
      category: "Clarity ultra",
    },
    {
      id: "product8",
      name: "SBU+ Kit Introductorio",
      image: "/placeholder.svg?height=200&width=200",
      description: "Kit completo con adhesivo Single Bond Universal Plus y cemento RelyX",
      category: "SBU+ Relyx",
    },
    {
      id: "product9",
      name: "RelyX Universal Clicker",
      image: "/placeholder.svg?height=200&width=200",
      description: "Dispensador tipo clicker para cemento RelyX Universal con dosificación precisa",
      category: "SBU+ Relyx",
    },
    {
      id: "product10",
      name: "Clinpro Clear Kit Preventivo",
      image: "/placeholder.svg?height=200&width=200",
      description: "Kit completo para prevención y remineralización de lesiones incipientes",
      category: "Clinpro Clear",
    },
    {
      id: "product11",
      name: "Clinpro Clear Sellante",
      image: "/placeholder.svg?height=200&width=200",
      description: "Sellante de fosas y fisuras fotocurable con liberación de flúor",
      category: "Clinpro Clear",
    },
    {
      id: "product12",
      name: "Easy Match Kit Digital",
      image: "/placeholder.svg?height=200&width=200",
      description: "Sistema digital para selección precisa de color en restauraciones estéticas",
      category: "Easy Match",
    },
    {
      id: "product13",
      name: "Easy Match Guía Física",
      image: "/placeholder.svg?height=200&width=200",
      description: "Guía física de colores fabricada con las resinas originales para comparación directa",
      category: "Easy Match",
    },
    {
      id: "product14",
      name: "Easy Match App Pro",
      image: "/placeholder.svg?height=200&width=200",
      description: "Aplicación profesional para smartphones que permite selección de color mediante fotografía",
      category: "Easy Match",
    },
  ]
  


const useFiltered = () => {
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
  

    return {
        filteredProducts,
        productsPerPage,
        setShowMore,
        showMore,
        visibleProducts
    }

}


export default useFiltered