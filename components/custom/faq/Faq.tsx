import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Users, Zap, LifeBuoy, ThumbsUp, Search } from "lucide-react"
import useFaq from "./useFaq"
import { LuCircleHelp } from "react-icons/lu";


const PageFaq = () => {

  const {
    searchQuery,
    setSearchQuery,
    filterQuestions,
    openItem,
    setOpenItem,
    questionToAccordionMap
  } = useFaq()


  return (
    <div className="w-full space-y-6">
    <div className="text-3xl font-bold flex items-center gap-2">
      <LuCircleHelp className="text-neutral-900 " />
      <div className="text-black text-2xl font-bold">
        Preguntas Frecuentes
      </div>
    </div>
      {/* Barra de búsqueda */}
      <div className="w-full flex flex-col sm:flex-row justify-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Busca tu pregunta aquí..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-background outline-none border border-neutral-200 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button 
          className="py-3 px-6 sm:w-auto w-full sm:min-w-[120px] bg-background cursor-pointer text-white rounded-xl hover:bg-neutral-700 transition-all duration-200 flex items-center justify-center" 
          onClick={() => setSearchQuery("")}
        >
          Limpiar
        </button>
      </div>

      {/* Preguntas populares */}
      <div className="space-y-4">
        <div className="flex items-center">
          <ThumbsUp className="h-5 w-5 text-neutral-600 mr-2" />
          <h2 className="text-xl font-semibold text-neutral-800">Preguntas más populares</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filterQuestions([
            "¿Cómo me registro en el congreso?",
            "¿Cuál es el costo de inscripción?",
            "¿Dónde se realizará el evento?",
            "¿Cuándo inicia el congreso?",
          ]).map((question) => (
            <button
              key={question}
              onClick={() => {
                const id = questionToAccordionMap[question];
                setOpenItem(id);
                const element = document.getElementById(id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="group p-4 bg-white rounded-xl border border-neutral-200 hover:border-neutral-400 hover:shadow-md transition-all duration-200 w-full text-left"
            >
              <div className="flex items-center text-neutral-800">
                <span className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                {question}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Secciones de FAQ */}
      <div className="space-y-6">
        {/* Información General */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center p-4 border-b border-neutral-100 bg-neutral-50">
            <Users className="h-5 w-5 text-neutral-600 mr-3" />
            <h2 className="text-xl font-semibold text-neutral-800">Información General</h2>
          </div>
          <div className="p-2">
            <Accordion 
              type="single" 
              collapsible 
              className="space-y-2"
              value={openItem}
              onValueChange={setOpenItem}
            >
              <AccordionItem 
                value="fecha" 
                className="border-neutral-100 data-[state=open]:bg-neutral-50 rounded-lg transition-colors duration-200"
                id="fecha"
              >
                <AccordionTrigger className="text-neutral-800 hover:text-neutral-600 px-4 py-4 hover:no-underline [&[data-state=open]>div]:text-neutral-600">
                  ¿Cuándo y dónde se realizará el congreso?
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600 px-4 pb-4">
                  El Congreso Magno 3.0 se llevará a cabo del [fecha] al [fecha] en [lugar].
                  Las sesiones comenzarán desde las 8:00 AM hasta las 6:00 PM.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem 
                value="ubicacion" 
                className="border-neutral-100 data-[state=open]:bg-neutral-50 rounded-lg transition-colors duration-200"
                id="ubicacion"
              >
                <AccordionTrigger className="text-neutral-800 hover:text-neutral-600 px-4 py-4 hover:no-underline [&[data-state=open]>div]:text-neutral-600">
                  ¿Dónde se realizará el evento?
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600 px-4 pb-4">
                  El evento se realizará en [lugar específico], ubicado en [dirección completa].
                  Contamos con estacionamiento disponible y fácil acceso al transporte público.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Registro y Pagos */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center p-4 border-b border-neutral-100 bg-neutral-50">
            <Zap className="h-5 w-5 text-neutral-600 mr-3" />
            <h2 className="text-xl font-semibold text-neutral-800">Registro y Pagos</h2>
          </div>
          <div className="p-2">
            <Accordion 
              type="single" 
              collapsible 
              className="space-y-2"
              value={openItem}
              onValueChange={setOpenItem}
            >
              <AccordionItem 
                value="registro" 
                className="border-neutral-100 data-[state=open]:bg-neutral-50 rounded-lg transition-colors duration-200"
                id="registro"
              >
                <AccordionTrigger className="text-neutral-800 hover:text-neutral-600 px-4 py-4 hover:no-underline [&[data-state=open]>div]:text-neutral-600">
                  ¿Cómo puedo registrarme?
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600 px-4 pb-4">
                  <p>El proceso de registro es simple:</p>
                  <ol className="list-decimal pl-5 mt-2 space-y-2">
                    <li>Completa el formulario de inscripción en línea</li>
                    <li>Realiza el pago correspondiente</li>
                    <li>Recibirás un correo de confirmación</li>
                    <li>Descarga tu comprobante de inscripción</li>
                  </ol>
                  <p className="mt-3 bg-neutral-50 p-3 rounded-lg text-sm">
                    <span className="font-medium">Consejo:</span> Ten a la mano tus documentos de identificación.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem 
                value="costos" 
                className="border-neutral-100 data-[state=open]:bg-neutral-50 rounded-lg transition-colors duration-200"
                id="costos"
              >
                <AccordionTrigger className="text-neutral-800 hover:text-neutral-600 px-4 py-4 hover:no-underline [&[data-state=open]>div]:text-neutral-600">
                  ¿Cuál es el costo de inscripción?
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600 px-4 pb-4">
                  <div className="mt-3 grid md:grid-cols-2 gap-3">
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <p className="font-medium text-neutral-800 mb-2">Inscripción temprana</p>
                      <ul className="text-sm space-y-1">
                        <li>• Estudiantes: $[precio]</li>
                        <li>• Profesionales: $[precio]</li>
                        <li>• Grupos (+3): $[precio] c/u</li>
                      </ul>
                    </div>
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <p className="font-medium text-neutral-800 mb-2">Inscripción regular</p>
                      <ul className="text-sm space-y-1">
                        <li>• Estudiantes: $[precio]</li>
                        <li>• Profesionales: $[precio]</li>
                        <li>• Grupos (+3): $[precio] c/u</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Soporte */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center p-4 border-b border-neutral-100 bg-neutral-50">
            <LifeBuoy className="h-5 w-5 text-neutral-600 mr-3" />
            <h2 className="text-xl font-semibold text-neutral-800">Soporte y Ayuda</h2>
          </div>
          <div className="p-2">
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="item-5" className="border-neutral-100 data-[state=open]:bg-neutral-50 rounded-lg transition-colors duration-200">
                <AccordionTrigger className="text-neutral-800 hover:text-neutral-600 px-4 py-4 hover:no-underline [&[data-state=open]>div]:text-neutral-600">
                  ¿Cómo puedo contactar al soporte?
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600 px-4 pb-4">
                  <div className="space-y-3">
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">📧</span>
                        <div>
                          <p className="font-medium text-neutral-800">Email</p>
                          <p className="text-sm">soporte@congreso.com</p>
                          <p className="text-xs text-neutral-500">Respuesta en 24h</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-neutral-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">💬</span>
                        <div>
                          <p className="font-medium text-neutral-800">Chat en vivo</p>
                          <p className="text-sm">Lun-Vie, 9:00 - 18:00</p>
                          <p className="text-xs text-neutral-500">Respuesta inmediata</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageFaq
