import { useEffect, useState } from "react"
import allProducts from '../../../shared/data/allProducts.json'


// Definir las categorías disponibles
export const productCategories = {
    "Z350XT": ["product1", "product2", "product3"],
    "Clarity advance": ["product4", "product5"],
    "Clarity ultra": ["product6", "product7"],
    "SBU+ Relyx": ["product8", "product9"],
    "Clinpro Clear": ["product10", "product11"],
    "Easy Match": ["product12", "product13", "product14"]
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
            product.category.toLowerCase().includes(term) ||
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