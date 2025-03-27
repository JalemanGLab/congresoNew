"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import useProductFilter from "./useProduct-filters"

interface ProductFiltersProps {
  categories: string[]
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const {
    allCategories,
    selectedCategory,
    handleSearch,
    searchTerm,
    setSearchTerm,
    handleCategoryChange,
    clearFilters
  } = useProductFilter(categories)

  // Check if any filters are active
  const isFiltered = selectedCategory !== "Todas" || searchTerm !== ""

  return (
    <div className="bg-[#001208]/80 backdrop-blur-sm rounded-2xl border border-[#00FF66]/20 shadow-xl p-4 md:p-8">
      <div className="flex flex-col gap-4">
        {/* Mobile and Tablet Layout */}
        <div className="md:hidden">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-white font-medium">Filtrar por categoría</h3>
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

            <form onSubmit={handleSearch} className="flex flex-col gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#00FF66]" />
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 text-base bg-[#001208] border-[#00FF66]/20 text-white focus-visible:ring-[#00FF66]/30 w-full"
                />
              </div>
              <Button
                type="button"
                className="bg-[#00FF66] hover:bg-[#00DD55] text-[#001208] flex items-center justify-center gap-2 px-4 py-2.5 w-full"
                onClick={isFiltered ? clearFilters : undefined}
              >
                {isFiltered ? (
                  <>
                    <X className="h-5 w-5" />
                    Limpiar
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    Buscar
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-[auto_1fr] gap-4 items-center">
          <div className="space-y-2">
            <h3 className="text-white font-medium md:text-xl">Filtrar por categoría</h3>
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

          <form onSubmit={handleSearch} className="flex gap-2 ml-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#00FF66]" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 text-base bg-[#001208] border-[#00FF66]/20 text-white focus-visible:ring-[#00FF66]/30 w-[360px]"
              />
            </div>
            <Button
              type="button"
              className="bg-[#00FF66] hover:bg-[#00DD55] text-[#001208] flex items-center justify-center gap-2 px-4 py-2.5"
              onClick={isFiltered ? clearFilters : undefined}
            >
              {isFiltered ? (
                <>
                  <X className="h-5 w-5" />
                  Limpiar
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Buscar
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
