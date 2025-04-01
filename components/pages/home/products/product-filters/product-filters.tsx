"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import useProductFilter from "./useProduct-filters";

interface ProductFiltersProps {
  categories: string[];
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const {
    allCategories,
    selectedCategory,
    handleSearch,
    searchTerm,
    setSearchTerm,
    handleCategoryChange,
    clearFilters,
  } = useProductFilter(categories);

  // Check if any filters are active
  const isFiltered = selectedCategory !== "Todas" || searchTerm !== "";

  return (
    <div className="bg-[#001208]/80 backdrop-blur-sm rounded-2xl border border-[#00FF66]/20 shadow-xl p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-4">
        <div className="md:hidden space-y-4">
          <div className="space-y-4">
            <h3 className="text-white font-medium text-lg">Filtrar por categoría</h3>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer px-2.5 py-1 text-sm ${
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
          <button 
            className="w-full bg-[#15d094] cursor-pointer text-[#002422] text-sm font-bold py-3 rounded-full hover:bg-[#13bb85] transition-colors"
            onClick={() => window.open("https://drive.google.com/drive/folders/1ApdvkbzjFLYxZ3_0LgviAc-lKiqSr58b", "_blank")}
          >
            Descargar Brochure
          </button>
        </div>

        <div className="hidden md:grid md:grid-cols-[1fr_auto] lg:grid-cols-[2fr_auto] gap-6 items-center">
          <div className="space-y-3">
            <h3 className="text-white font-medium text-xl">Filtrar por categoría</h3>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-1.5 text-base ${
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
          <button 
            className="bg-[#15d094] cursor-pointer text-[#002422] font-bold px-6 py-3 rounded-full hover:bg-[#13bb85] transition-colors whitespace-nowrap"
            onClick={() => window.open("https://drive.google.com/drive/folders/1ApdvkbzjFLYxZ3_0LgviAc-lKiqSr58b", "_blank")}
          >
            Descargar Brochure
          </button>
        </div>
      </div>
    </div>
  );
}
