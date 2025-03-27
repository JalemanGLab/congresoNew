"use client"

import { useState, useEffect } from "react"

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

    // Función para manejar la búsqueda en tiempo real
    useEffect(() => {
        // Emitir evento personalizado cuando cambia el término de búsqueda
        window.dispatchEvent(
            new CustomEvent("filterChange", {
                detail: {
                    category: selectedCategory === "Todas" ? null : selectedCategory,
                    searchTerm
                },
            }),
        )
    }, [searchTerm, selectedCategory])

    // Función para manejar el envío del formulario
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
    }

    // Función para limpiar los filtros
    const clearFilters = () => {
        setSelectedCategory("Todas")
        setSearchTerm("")
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
