import { useEffect, useState } from "react"
import allProducts from '../../../shared/data/allProducts.json'


// Definir las categorías disponibles
export const productCategories = {
  "Clarity ultra": ["product1", "product2", "product3", "product4", "product5"],
  "SBU+ Relix": ["product6", "product7", "product8", "product9", "product10"],
  "Z350XT": ["product11", "product12", "product13", "product14", "product15", "product16", "product17"],
  "Clarity advance": [""],
  "Clinpro Clear": [""],
  "Easy Match": [""],
}

const useProductsSection =()=>{

    const [showMore, setShowMore] = useState(false)
    const [filteredProducts, setFilteredProducts] = useState(allProducts)
    const [selectedCategory, setSelectedCategory] = useState("Todas")
    const [searchTerm, setSearchTerm] = useState("")


    // Función para filtrar productos
    const filterProducts = (category: string | null, search: string) => {
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
      setShowMore(false)
    }
    // Escuchar eventos de cambio de filtro
    useEffect(() => {
      const handleFilterChange = (e: Event) => {
        const customEvent = e as CustomEvent
        const { category, searchTerm } = customEvent.detail
        setSelectedCategory(category || "Todas")
        setSearchTerm(searchTerm || "")
        filterProducts(category, searchTerm)
      }
      window.addEventListener("filterChange", handleFilterChange as EventListener)
      return () => {
        window.removeEventListener("filterChange", handleFilterChange as EventListener)
      }
    }, [])
    const visibleProducts = showMore ? filteredProducts : filteredProducts.slice(0, 6)
    const remainingCount = filteredProducts.length - 6
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
