"use client"
import ProductFilters from "./product-filters"
import FilteredProductGrid from "./filtered-product-grid"

export default function ProductsSection() {
	return (
		<section id="productos" className="py-28 bg-gradient-to-b from-[#001810] to-[#002A1A] relative overflow-hidden">
			<div className="absolute inset-0">
				<div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1600')] bg-no-repeat bg-cover opacity-5"></div>
			</div>
			<div className="container relative z-10">
				<div className="text-center mb-20">
					<h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Productos Disponibles</h2>
					<div className="h-1 w-24 bg-gradient-to-r from-[#00FF66]/50 to-[#00FF66] mx-auto mb-6"></div>
					<p className="text-white/80 max-w-3xl mx-auto text-lg">
						Descubre los productos odontológicos más innovadores que estarán disponibles en el Congreso Magno 3.0.
						Utiliza los filtros para encontrar exactamente lo que necesitas.
					</p>
				</div>
				<ProductFilters />
				<div className="mt-12">
					<FilteredProductGrid />
				</div>
			</div>
		</section>
	)
}

