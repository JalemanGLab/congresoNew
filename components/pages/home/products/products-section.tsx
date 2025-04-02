"use client";

import ProductFilters from "./product-filters/product-filters";
import ProductCard from "./product-card/product-card";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import useProductsSection, { productCategories } from "./useProducts-section";

export default function ProductsSection() {
  const {
    remainingCount,
    searchTerm,
    selectedCategory,
    visibleProducts,
    filteredProducts,
    showMore,
    setShowMore,
  } = useProductsSection();

  return (
    <section
      id="productos"
      className="py-5 bg-[#003027] relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-visible">
        {/* Círculo superior izquierdo */}
        <div className="absolute z-10 top-[260px] -left-[150px] w-[400px] h-[400px] rounded-full bg-[#1BEB7E] opacity-[0.25] blur-[130px]"></div>
        {/* Círculo inferior derecho */}
        <div className="absolute z-10 bottom-[150px] right-[50px] w-[200px] h-[200px] rounded-full bg-[#1BEB7E] opacity-[0.25] blur-[130px]"></div>
      </div>

      <div className="container relative ">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Productos Disponibles
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#00FF66]/50 to-[#00FF66] mx-auto mb-6"></div>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            Descubre los productos odontológicos más innovadores que estarán
            disponibles en el Congreso Magno 3.0. Utiliza los filtros para
            encontrar exactamente lo que necesitas.
          </p>
        </div>

        {/* Product Filters */}
        <ProductFilters categories={Object.keys(productCategories)} />

        {/* Product Grid */}
        <div className="mt-12">
          {filteredProducts.length === 0 ? (
            <div></div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="flex justify-center">
                    <ProductCard {...product} />
                  </div>
                ))}
              </div>

              {/* Botón de cerrar */}
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  className="border-[#00FF66]/30 text-white hover:bg-[#00FF66]/10 hover:border-[#00FF66] transition-colors duration-200"
                  onClick={() => {
                    // Limpiar productos y categoría seleccionada
                    window.dispatchEvent(
                      new CustomEvent("filterChange", {
                        detail: { category: null, searchTerm: "" },
                      })
                    );

                    // Disparar evento para limpiar la categoría seleccionada en el componente de filtros
                    window.dispatchEvent(new CustomEvent("resetFilters"));
                  }}
                >
                  Cerrar
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
