import { useEffect, useState } from "react"
import allProducts from '../../../shared/data/allProducts.json'


// Definir las categorías disponibles
export const productCategories = {
  "Clarity ultra": ["product1", "product2", "product3", "product4", "product5"],
  "SBU+ Relix": ["product6", "product7", "product8", "product9", "product10"],
  "Z350XT": ["product11", "product12", "product13", "product14", "product15", "product16", "product17"],
  "Clarity advance": ["product18", "product19"],
  "Clinpro Clear": ["product20", "product21", "product22"],
  "Easy Match": ["product23", "product24", "product25", "product26", "product27"],
}

// Definir el tipo de producto
type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
}

const useProductsSection =()=>{

    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
    const [selectedCategory, setSelectedCategory] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    // Función para filtrar productos
    const filterProducts = (category: string | null, search: string) => {
      // Si no hay categoría seleccionada y no hay término de búsqueda, no mostrar productos
      if (!category && !search) {
        setFilteredProducts([])
        return
      }
      
      let filtered = [...allProducts]
      // Filtrar por categoría
      if (category && category !== "Todas") {
        const categoryProducts = productCategories[category as keyof typeof productCategories] || []
        filtered = filtered.filter((product) => categoryProducts.includes(product.id))
      }
      // Filtrar por término de búsqueda
      if (search) {
        const term = search.toLowerCase()
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term) ||
            // product.category.toLowerCase().includes(term) ||
            product.brand.toLowerCase().includes(term)
        )
      }
      setFilteredProducts(filtered)
    }
    // Escuchar eventos de cambio de filtro
    useEffect(() => {
      const handleFilterChange = (e: Event) => {
        const customEvent = e as CustomEvent
        const { category, searchTerm } = customEvent.detail
        setSelectedCategory(category || "")
        setSearchTerm(searchTerm || "")
        filterProducts(category, searchTerm)
      }
      window.addEventListener("filterChange", handleFilterChange as EventListener)
      return () => {
        window.removeEventListener("filterChange", handleFilterChange as EventListener)
      }
    }, [])
    const visibleProducts = filteredProducts
    const remainingCount = 0
    const showMore = true
    const setShowMore = () => {}
    
    return{
        selectedCategory,
        searchTerm,
        visibleProducts,
        remainingCount,
        filteredProducts,
        showMore,
        setShowMore
    }
}

export default useProductsSection
