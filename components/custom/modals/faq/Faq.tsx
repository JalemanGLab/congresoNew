import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import useFaq from "./useFaq"
import { LuCircleHelp } from "react-icons/lu";
import { DataFAQ } from "../../../shared/data/dataFAQ";

interface PageFaqProps {
  onClose?: () => void;
}

const PageFaq = ({ onClose }: PageFaqProps) => {
  const {
    openItem,
    setOpenItem,
  } = useFaq()

  return (
    <div className="flex flex-col w-full lg:w-[800px] h-full bg-white rounded-xl shadow-xl overflow-hidden mb-5">
      {/* Header */}
      <div className="w-full bg-[#00391c] p-5 flex flex-col gap-4">
        <div className="flex items-center">
          <div className="flex items-center gap-3">
            <LuCircleHelp className="text-white h-6 w-6" />
            <h1 className="text-white text-2xl font-medium">Preguntas Frecuentes</h1>
          </div>
        </div>
      </div>

      {/* FAQ Content with scroll */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-5 space-y-4">
          {DataFAQ.map((section) => (
            <div key={section.id} className="bg-white rounded-lg border border-green-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center p-4 border-b border-green-100 bg-green-900">
                {section.icon && <section.icon className="h-5 w-5 text-white mr-3" />}
                <h2 className="text-lg font-semibold text-white">{section.title}</h2>
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
                      className="border-green-100 rounded-md transition-colors duration-200"
                      id={item.id}
                    >
                      <AccordionTrigger className="text-green-800 hover:text-green-600 px-4 py-3 hover:no-underline text-sm text-left justify-start">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-green-700 px-4 pb-4 text-sm">
                        <div className="leading-relaxed">{item.answer}</div>
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
  );
};

export default PageFaq;
