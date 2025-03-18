"use client"

import ProductFilters from "./product-filters"
import FilteredProductGrid from "./filtered-product-grid"
import ProductModal from "./product-modal"

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

        {/* Product Filters */}
        <ProductFilters />

        {/* Product Grid */}
        <div className="mt-12">
          <FilteredProductGrid />
        </div>
      </div>

      {/* Product Modals */}
      <ProductModal
        id="product1"
        name="Z350XT Kit Introductorio"
        image="/placeholder.svg?height=400&width=400"
        description="Kit completo con jeringas de todos los tonos esenciales. La resina Z350XT ofrece una combinación única de estética, resistencia y manipulación para restauraciones anteriores y posteriores."
        category="Restauración"
        features={[
          "8 jeringas de diferentes tonos",
          "Guía de colores incluida",
          "Adhesivo Single Bond Universal",
          "Instrucciones detalladas de uso",
        ]}
        specifications={[
          "Contenido: 8 jeringas x 4g",
          "Tonos: A1, A2, A3, A3.5, B1, B2, C2, D2",
          "Vida útil: 3 años",
          "Fabricante: 3M ESPE",
          "Origen: USA",
        ]}
        brand="3M ESPE"
      />

      <ProductModal
        id="product2"
        name="Z350XT Jeringa Individual"
        image="/placeholder.svg?height=400&width=400"
        description="Jeringa individual de resina compuesta Z350XT para reposición. Ofrece alta resistencia al desgaste y excelente pulido para restauraciones duraderas y estéticas."
        category="Restauración"
        features={[
          "Alta resistencia al desgaste",
          "Excelente pulido y retención de brillo",
          "Manipulación óptima",
          "Fluorescencia natural",
        ]}
        specifications={[
          "Contenido: 1 jeringa x 4g",
          "Disponible en 20 tonos diferentes",
          "Radiopacidad: 250% Al",
          "Tiempo de trabajo: 90 segundos bajo luz ambiental",
        ]}
        brand="3M ESPE"
      />

      <ProductModal
        id="product3"
        name="Z350XT Flow"
        image="/placeholder.svg?height=400&width=400"
        description="Resina fluida con la misma tecnología de nanorelleno para áreas de difícil acceso. Ideal para pequeñas cavidades y como base en restauraciones profundas."
        category="Restauración"
        features={[
          "Fluidez controlada",
          "Ideal para pequeñas cavidades",
          "Excelente adaptación marginal",
          "Compatible con Z350XT en pasta",
        ]}
        specifications={[
          "Contenido: Jeringa 2g con puntas aplicadoras",
          "Tonos disponibles: A1, A2, A3, A3.5, B1, B2",
          "Viscosidad: Media",
          "Profundidad de curado: 2mm",
        ]}
        brand="3M ESPE"
      />

      <ProductModal
        id="product4"
        name="Clarity Advance Kit Completo"
        image="/placeholder.svg?height=400&width=400"
        description="Kit completo de brackets cerámicos para tratamiento de arco completo. Diseñado para ofrecer estética y eficiencia en tratamientos ortodónticos."
        category="Ortodoncia"
        features={[
          "Brackets cerámicos transparentes",
          "Diseño de baja fricción",
          "Sistema MBT o Roth disponible",
          "Incluye herramientas de colocación",
        ]}
        specifications={[
          "Contenido: 20 brackets (10 superiores, 10 inferiores)",
          'Slot: .022"',
          "Material: Cerámica policristalina",
          "Adhesivo: APC Flash-Free incluido",
        ]}
        brand="3M Unitek"
      />

      <ProductModal
        id="product5"
        name="Clarity Advance Arcos Estéticos"
        image="/placeholder.svg?height=400&width=400"
        description="Arcos recubiertos estéticos para complementar el sistema Clarity Advance. Ofrecen una apariencia discreta sin comprometer la eficacia del tratamiento."
        category="Ortodoncia"
        features={[
          "Recubrimiento estético color diente",
          "Alta resistencia a manchas",
          "Excelente memoria de forma",
          "Compatible con todos los brackets cerámicos",
        ]}
        specifications={[
          "Material: NiTi con recubrimiento estético",
          "Formas: Ovoid, Tapered y Natural",
          'Calibres: .014", .016", .018", .017x.025"',
          "Presentación: Paquete de 5 arcos",
        ]}
        brand="3M Unitek"
      />

      <ProductModal
        id="product6"
        name="Clarity Ultra Kit Autoligable"
        image="/placeholder.svg?height=400&width=400"
        description="Sistema completo de brackets cerámicos autoligables de última generación. Combina estética superior con la eficiencia de la tecnología autoligable."
        category="Ortodoncia"
        features={[
          "Tecnología autoligable pasiva-activa",
          "Diseño totalmente cerámico, incluido el clip",
          "Perfil ultra bajo para mayor comodidad",
          "Resistencia superior a fracturas",
        ]}
        specifications={[
          "Contenido: 20 brackets autoligables",
          "Prescripción: MBT o Roth",
          'Slot: .022"',
          "Sistema APC Flash-Free preincorporado",
        ]}
        brand="3M Unitek"
      />

      <ProductModal
        id="product7"
        name="Clarity Ultra Herramientas"
        image="/placeholder.svg?height=400&width=400"
        description="Set de herramientas especializadas para el manejo del sistema Clarity Ultra. Diseñadas para facilitar la colocación y ajuste de brackets autoligables."
        category="Ortodoncia"
        features={[
          "Herramienta de apertura y cierre de clips",
          "Posicionador de brackets de precisión",
          "Alicates especiales para arcos estéticos",
          "Estuche organizador incluido",
        ]}
        specifications={[
          "Material: Acero inoxidable quirúrgico",
          "Esterilizable en autoclave",
          "Mangos ergonómicos",
          "Garantía: 2 años",
        ]}
        brand="3M Unitek"
      />

      <ProductModal
        id="product8"
        name="SBU+ Kit Introductorio"
        image="/placeholder.svg?height=400&width=400"
        description="Kit completo con adhesivo Single Bond Universal Plus y cemento RelyX. Solución integral para procedimientos adhesivos y de cementación."
        category="Adhesivos"
        features={[
          "Adhesivo universal para técnica total-etch y self-etch",
          "Cemento de resina autoadhesivo RelyX",
          "Compatible con todos los materiales restauradores",
          "Aplicación simplificada en un solo paso",
        ]}
        specifications={[
          "Contenido: Adhesivo 5ml, Cemento RelyX 8.5g",
          "Puntas aplicadoras incluidas",
          "Tiempo de trabajo: 2 minutos",
          "Tiempo de fotocurado: 20 segundos",
        ]}
        brand="3M ESPE"
      />

      <ProductModal
        id="product9"
        name="RelyX Universal Clicker"
        image="/placeholder.svg?height=400&width=400"
        description="Dispensador tipo clicker para cemento RelyX Universal con dosificación precisa. Facilita la mezcla y aplicación del cemento para resultados consistentes."
        category="Cementos"
        features={[
          "Dispensación precisa 1:1",
          "Sistema clicker fácil de usar",
          "Cemento universal para todo tipo de restauraciones",
          "Excelente estabilidad de color",
        ]}
        specifications={[
          "Contenido: 4.5g de cemento (aproximadamente 20 aplicaciones)",
          "Colores disponibles: Translúcido, A1, A3, Opaco",
          "Resistencia a la flexión: 120 MPa",
          "Grosor de película: <20 μm",
        ]}
        brand="3M ESPE"
      />

      <ProductModal
        id="product10"
        name="Clinpro Clear Kit Preventivo"
        image="/placeholder.svg?height=400&width=400"
        description="Kit completo para prevención y remineralización de lesiones incipientes. Incluye productos para un enfoque integral de la prevención."
        category="Prevención"
        features={[
          "Sellante Clinpro Clear transparente",
          "Barniz de flúor Clinpro White Varnish",
          "Pasta profiláctica Clinpro Prophy",
          "Instrucciones detalladas de aplicación",
        ]}
        specifications={[
          "Contenido: Sellante 1.2ml, Barniz 50 unidosis, Pasta 200g",
          "Liberación sostenida de flúor, calcio y fosfato",
          "pH neutro",
          "Sabor: Menta suave",
        ]}
        brand="3M ESPE"
      />

      <ProductModal
        id="product11"
        name="Clinpro Clear Sellante"
        image="/placeholder.svg?height=400&width=400"
        description="Sellante de fosas y fisuras fotocurable con liberación de flúor. Ofrece protección duradera contra caries en superficies oclusales."
        category="Prevención"
        features={[
          "Tecnología de cambio de color para control de aplicación",
          "Excelente fluidez para penetración en fisuras",
          "Liberación sostenida de flúor",
          "Alta resistencia al desgaste",
        ]}
        specifications={[
          "Contenido: 2 jeringas x 1.2ml con puntas aplicadoras",
          "Color: Transparente con indicador rosa temporal",
          "Tiempo de fotocurado: 20 segundos",
          "Vida útil: 2 años",
        ]}
        brand="3M ESPE"
      />

      <ProductModal
        id="product12"
        name="Easy Match Kit Digital"
        image="/placeholder.svg?height=400&width=400"
        description="Sistema digital para selección precisa de color en restauraciones estéticas. Combina tecnología espectrofotométrica con software de análisis avanzado."
        category="Estética"
        features={[
          "Espectrofotómetro dental portátil",
          "Software de análisis de color",
          "Guía de correspondencia con resinas Z350XT",
          "Batería recargable de larga duración",
        ]}
        specifications={[
          "Precisión: ±1 en escala VITA",
          'Pantalla táctil de 3.5"',
          "Conectividad: Bluetooth y USB",
          "Memoria para 500 pacientes",
        ]}
        brand="3M ESPE"
      />

      <ProductModal
        id="product13"
        name="Easy Match Guía Física"
        image="/placeholder.svg?height=400&width=400"
        description="Guía física de colores fabricada con las resinas originales para comparación directa. Permite una selección precisa de tonos en condiciones de iluminación real."
        category="Estética"
        features={[
          "Muestras fabricadas con resina Z350XT real",
          "Organización por valor, croma y translucidez",
          "Incluye guía de estratificación",
          "Estuche ergonómico esterilizable",
        ]}
        specifications={[
          "Contenido: 26 muestras de color",
          "Material: Resina compuesta Z350XT",
          "Organización: Sistema 3D-Master modificado",
          "Incluye guía de correspondencia con VITA",
        ]}
        brand="3M ESPE"
      />

      <ProductModal
        id="product14"
        name="Easy Match App Pro"
        image="/placeholder.svg?height=400&width=400"
        description="Aplicación profesional para smartphones que permite selección de color mediante fotografía. Utiliza inteligencia artificial para análisis preciso de color dental."
        category="Estética"
        features={[
          "Análisis de color mediante IA",
          "Compatibilidad con iOS y Android",
          "Integración con historias clínicas digitales",
          "Modo de comunicación con laboratorio",
        ]}
        specifications={[
          "Licencia: 1 año (renovable)",
          "Requiere: iOS 14+ o Android 10+",
          "Espacio en disco: 250MB",
          "Soporte para cámaras externas",
        ]}
        brand="3M ESPE"
      />
    </section>
  )
}

