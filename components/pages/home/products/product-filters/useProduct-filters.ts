"use client"

import { useState, useEffect } from "react"

const useProductFilter = (categories: string[]) => {
    const [selectedCategory, setSelectedCategory] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    // Función para manejar el cambio de categoría
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
        // Emitir evento personalizado para que el componente de productos pueda escucharlo
        window.dispatchEvent(
            new CustomEvent("filterChange", {
                detail: { category, searchTerm },
            }),
        )
    }

    // ... existing code ...
    const handleDownloadBrochures = () => {
        // Enlace único a todos los brochures (reemplaza esta URL con tu enlace real)
        const brochureLink = "https://jmpukiohbcemfjqcsikc.supabase.co/storage/v1/object/sign/pdf/Brochure.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwZGYvQnJvY2h1cmUucGRmIiwiaWF0IjoxNzQzNTcyNzcxLCJleHAiOjE3NzUxMDg3NzF9.qJe_LMPT2vp4EqWzvMEHHKehrVl2StHY0Bn9uNrpTc8";
        
        // Abrir el enlace en una nueva pestaña
        window.open(brochureLink, "_blank");
    };

    // Función para manejar la búsqueda en tiempo real
    useEffect(() => {
        // Emitir evento personalizado cuando cambia el término de búsqueda
        window.dispatchEvent(
            new CustomEvent("filterChange", {
                detail: {
                    category: selectedCategory,
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
        setSelectedCategory("")
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
        clearFilters,
        setSelectedCategory,
        handleDownloadBrochures,
    }
}

export default useProductFilter
