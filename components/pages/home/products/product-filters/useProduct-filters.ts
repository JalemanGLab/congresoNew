import { useState } from "react"

const useProductFilter = (categories: string[]) => {

    const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [searchTerm, setSearchTerm] = useState("")

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    // Emitir evento personalizado para que el componente de productos pueda escucharlo
    window.dispatchEvent(
      new CustomEvent("filterChange", {
        detail: { category: category === "Todas" ? null : category, searchTerm },
      }),
    )
  }

  // Función para manejar la búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Emitir evento personalizado para que el componente de productos pueda escucharlo
    window.dispatchEvent(
      new CustomEvent("filterChange", {
        detail: { category: selectedCategory === "Todas" ? null : selectedCategory, searchTerm },
      }),
    )
  }

  // Función para limpiar los filtros
  const clearFilters = () => {
    setSelectedCategory("Todas")
    setSearchTerm("")
    // Emitir evento personalizado para que el componente de productos pueda escucharlo
    window.dispatchEvent(
      new CustomEvent("filterChange", {
        detail: { category: null, searchTerm: "" },
      }),
    )
  }

  const allCategories = ["Todas", ...categories]


    return {
        allCategories,
        selectedCategory,
        handleSearch,
        searchTerm,
        setSearchTerm,
        handleCategoryChange,
        clearFilters
    }
}

export default useProductFilter