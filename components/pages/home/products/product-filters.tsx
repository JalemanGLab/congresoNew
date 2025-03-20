"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProductFiltersProps {
  categories: string[]
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
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

  return (
    <div className="bg-[#001208]/80 backdrop-blur-sm rounded-2xl border border-[#00FF66]/20 shadow-xl p-8">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="space-y-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-[#00FF66]" />
            <h3 className="text-white font-medium">Filtrar por categoría</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer px-3 py-1 ${
                  selectedCategory === category
                    ? "bg-[#00FF66] hover:bg-[#00DD55] text-[#001208]"
                    : "bg-[#00FF66]/10 text-white hover:bg-[#00FF66]/20 border-[#00FF66]/20"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#00FF66]" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#001208] border-[#00FF66]/20 text-white focus-visible:ring-[#00FF66]/30 w-full"
            />
          </div>
          <Button type="submit" className="bg-[#00FF66] hover:bg-[#00DD55] text-[#001208]">
            Buscar
          </Button>
        </form>

        {(selectedCategory !== "Todas" || searchTerm) && (
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-[#00FF66]/10 flex items-center gap-1"
            onClick={clearFilters}
          >
            <X className="h-4 w-4" />
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  )
}

