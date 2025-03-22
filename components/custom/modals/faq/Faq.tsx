import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ThumbsUp, Search, X } from "lucide-react"
import useFaq from "./useFaq"
import { LuCircleHelp } from "react-icons/lu";
import { DataFAQ, popularQuestions } from "../../../shared/data/dataFAQ";


const PageFaq = () => {
  const {
    searchQuery,
    setSearchQuery,
    filterQuestions,
    openItem,
    setOpenItem,
    questionToAccordionMap
  } = useFaq()

  const handleQuestionClick = (question: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const id = questionToAccordionMap[question];
    setOpenItem(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-[90vh] bg-white rounded-xl shadow-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="w-full bg-[#00391c] p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LuCircleHelp className="text-white h-6 w-6" />
              <h1 className="text-white text-2xl font-medium">Preguntas Frecuentes</h1>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-800" />
              <input
                type="text"
                placeholder="Busca tu pregunta aquí..."
                className="w-full pl-10 pr-3 py-2 rounded-lg text-green-800 bg-white/90 outline-none border border-green-200 focus:border-green-400 focus:ring-2 focus:ring-green-200 transition-all duration-200 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              className="h-10 px-3 sm:px-3 bg-white/90 cursor-pointer text-green-800 rounded-md hover:bg-white transition-all duration-200 flex items-center justify-center border border-green-200 md:gap-3 font-medium"
              onClick={(e) => {
                e.stopPropagation();
                setSearchQuery("");
              }}
            >
              <X className="h-4 w-4" />
              <span className="hidden lg:block">Limpiar</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <ThumbsUp className="h-5 w-5 text-green-700 mr-2" />
              <h2 className="text-xl font-semibold text-green-800">Preguntas más populares</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filterQuestions(popularQuestions).map((question) => (
                <button
                  key={question}
                  onClick={(e) => handleQuestionClick(question, e)}
                  className="group p-4 bg-white rounded-xl border border-green-100 hover:border-green-400 hover:shadow-md transition-all duration-200 w-full text-left"
                >
                  <div className="flex items-center text-green-800">
                    <span className="mr-3 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                    {question}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Secciones de FAQ */}
          <div className="space-y-6">
            {DataFAQ.map((section) => (
              <div key={section.id} className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center p-4 border-b border-green-100 bg-green-900">
                  {section.icon && <section.icon className="h-5 w-5 text-white mr-3" />}
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                </div>
                <div className="p-2">
                  <Accordion
                    type="single"
                    collapsible
                    className="space-y-2"
                    value={openItem}
                    onValueChange={setOpenItem}
                  >
                    {section.questions.map((item) => (
                      <AccordionItem
                        key={item.id}
                        value={item.id}
                        className="border-green-100 rounded-lg transition-colors duration-200"
                        id={item.id}
                      >
                        <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-4 hover:no-underline ">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-green-700 px-4 pb-4">
                          <div className="">{item.answer}</div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageFaq;
