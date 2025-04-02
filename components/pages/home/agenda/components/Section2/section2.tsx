"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Section2() {
  // Estados para mobile (dos tabs separados)
  const [activeDentalTab, setActiveDentalTab] = useState("dental_morning");
  const [activeOrtodonciaTab, setActiveOrtodonciaTab] = useState("ortodoncia_morning");
  
  // Estado para desktop (un solo tab)
  const [activeTab, setActiveTab] = useState("dental_morning");

  // Datos para Salón Dental - Mañana
  const timelineDentalMorning = [
    {
      time: "8:00 am - 9:00 am",
      title: "Registro y Bienvenida",
      speaker: "",
      step: 1,
    },
    {
      time: "9:00 am - 10:30 am",
      title: "Planificación y fotografía clínica para el éxito de los protocolos restaurativos",
      speaker: "Dr. Andres Enrique Ponce Villareal",
      step: 2,
    },
    {
      time: "10:30 am - 11:00 am",
      title: "Break",
      speaker: "",
      step: 3,
    },
    {
      time: "11:00 am - 12:15 pm",
      title: "Parte I: Enfoques contemporáneos en el tratamiento de lesiones cervicales no cariosas: Rol de flúor en el manejo de la hipersensibilidad dentaria",
      speaker: "Dr. Michael Wendler Ernst",
      step: 4,
    },
    {
      time: "12:15 pm - 12:30 pm",
      title: "Almuerzo",
      speaker: "",
      step: 5,
    },
  ];

  // Datos para Salón Dental - Tarde
  const timelineDentalAfternoon = [
    {
      time: "1:30 pm - 2:15 pm",
      title: "Mentalidad de expansión para una gestión odontológica de alto impacto y transcendencia",
      speaker: "Dr. Orlando Fajardo / Miguel Edgar Ospina Ospina",
      step: 1,
    },
    {
      time: "2:15 pm - 3:15 pm",
      title: "Parte II: Barnices de flúor en odontología: ¿Has pensado que puedes hacer en 15 minutos?",
      speaker: "Dr. Michael Wendler Ernst",
      step: 2,
    },
    {
      time: "3:15 pm - 4:15 pm",
      title: "Break",
      speaker: "",
      step: 3,
    },
    {
      time: "4:15 pm - 6:15 pm",
      title: "Actualización en procesos rehabilitadores en restauraciones mínimamente invasivas",
      speaker: "Dr. Oswaldo Scopin de Andrade",
      step: 4,
    },
  ];

  // Datos para Salón Ortodoncia - Mañana
  const timelineOrtodonciaMorning = [
    {
      time: "8:00 am - 9:00 am",
      title: "Registro y Bienvenida",
      speaker: "",
      step: 1,
    },
    {
      time: "9:00 am - 10:30 am",
      title: "La ortodoncia como diferencial en rehabilitaciones estéticas, protésicas y quirúrgicas",
      speaker: "Dra. Juliana Romanell",
      step: 2,
    },
    {
      time: "10:30 am - 11:00 am",
      title: "Break",
      speaker: "",
      step: 3,
    },
    {
      time: "11:00 am - 12:15 pm",
      title: "Corrección de maloclusiones complejas usando tecnología Solventum",
      speaker: "Dr. Alfonso de los Reyes",
      step: 4,
    },
    {
      time: "12:15 pm - 12:30 pm",
      title: "Almuerzo",
      speaker: "",
      step: 5,
    },
  ];

  // Datos para Salón Ortodoncia - Tarde
  const timelineOrtodonciaAfternoon = [
    {
      time: "1:30 pm - 2:15 pm",
      title: "Mentalidad de expansión para una gestión odontológica de alto impacto y transcendencia",
      speaker: "Dr. Orlando Fajardo / Miguel Edgar Ospina Ospina",
      step: 1,
    },
    {
      time: "2:15 pm - 4:15 pm",
      title: "Eficiencia detrás de la estética: Abordando la complejidad con ligereza",
      speaker: "Dr. Fernando Rhoden",
      step: 2,
    },
    {
      time: "4:15 pm - 5:00 pm",
      title: "Break",
      speaker: "",
      step: 3,
    },
  ];

  // Función para obtener el timeline correcto
  const getTimelineData = (tab: string) => {
    switch(tab) {
      case "dental_morning":
        return timelineDentalMorning;
      case "dental_afternoon":
        return timelineDentalAfternoon;
      case "ortodoncia_morning":
        return timelineOrtodonciaMorning;
      case "ortodoncia_afternoon":
        return timelineOrtodonciaAfternoon;
      default:
        return timelineDentalMorning;
    }
  };

  return (
    <>
      {/* Versión Mobile (se oculta en lg) */}
      <div className="lg:hidden w-full flex flex-col gap-12 max-w-[1425px] mx-auto px-10 py-12">
        {/* Primer tab y timeline */}
        <div className="w-full flex flex-col gap-10">
          <div className="bg-[#001208]/80 backdrop-blur-sm rounded-[32px] p-1">
            <div className="w-full flex flex-row justify-between gap-2">
              <div 
                onClick={() => setActiveDentalTab("dental_morning")}
                className={cn(
                  "w-full rounded-full px-4 py-2 cursor-pointer",
                  activeDentalTab === "dental_morning" ? "bg-[#0c231b]" : ""
                )}
              >
                <div className="text-center text-white/80 text-[13px] leading-none">
                  Mañana
                </div>
                <div className="text-center text-white text-[14px] font-medium uppercase leading-tight">
                  Salón Dental
                </div>
              </div>
              <div 
                onClick={() => setActiveDentalTab("dental_afternoon")}
                className={cn(
                  "w-full rounded-full px-4 py-2 cursor-pointer",
                  activeDentalTab === "dental_afternoon" ? "bg-[#0c231b]" : ""
                )}
              >
                <div className="text-center text-white/80 text-[13px] leading-none">
                  Tarde
                </div>
                <div className="text-center text-white text-[14px] font-medium uppercase leading-tight">
                  Salón Dental
                </div>
              </div>
            </div>
          </div>
          {/* Timeline Dental */}
          <div className="relative">
            {/* Línea vertical */}
            <div className={cn(
              "absolute w-[1px] bg-[#05dd4d] top-8 bottom-8",
              activeDentalTab === "dental_morning" ? "left-4" : "right-4"
            )} />

            {/* Items del timeline */}
            <div className="relative space-y-8">
              {getTimelineData(activeDentalTab).map((item, index) => (
                <div key={index} className={cn(
                  "relative flex",
                  activeDentalTab === "dental_morning" 
                    ? "pl-12 flex-row" 
                    : "pr-12 flex-row-reverse"
                )}>
                  {/* Círculo numerado */}
                  <div className={cn(
                    "absolute w-8 h-8 bg-[#05dd4d] rounded-full flex items-center justify-center text-[#001208] font-medium",
                    activeDentalTab === "dental_morning" ? "left-0" : "right-0"
                  )}>
                    {item.step}
                  </div>

                  {/* Contenido */}
                  <div className={cn(
                    "flex-1",
                    activeDentalTab === "dental_morning" ? "pl-4 lg:pl-12" : "pr-4 lg:pr-12"
                  )}>
                    <div className="text-[#00FF66] text-sm mb-2">{item.time}</div>
                    <h3 className="text-white font-medium mb-1">{item.title}</h3>
                    {item.speaker && (
                      <p className="text-white font-light text-sm">
                        {item.speaker}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Segundo tab y timeline */}
        <div className="w-full flex flex-col gap-10">
          <div className="bg-[#001208]/80 backdrop-blur-sm rounded-[32px] p-1">
            <div className="w-full flex flex-row justify-between gap-2">
              <div 
                onClick={() => setActiveOrtodonciaTab("ortodoncia_morning")}
                className={cn(
                  "w-full rounded-full px-4 py-2 cursor-pointer",
                  activeOrtodonciaTab === "ortodoncia_morning" ? "bg-[#0c231b]" : ""
                )}
              >
                <div className="text-center text-white/80 text-[12px] leading-none">
                  Mañana
                </div>
                <div className="text-center text-white text-[12px] font-medium uppercase leading-tight">
                  Salon Ortodoncia
                </div>
              </div>
              <div 
                onClick={() => setActiveOrtodonciaTab("ortodoncia_afternoon")}
                className={cn(
                  "w-full rounded-full px-4 py-2 cursor-pointer",
                  activeOrtodonciaTab === "ortodoncia_afternoon" ? "bg-[#0c231b]" : ""
                )}
              >
                <div className="text-center text-white/80 text-[11px] leading-none">
                  Tarde
                </div>
                <div className="text-center text-white text-[11px] font-medium uppercase leading-tight">
                  Salon Ortodoncia
                </div>
              </div>
            </div>
          </div>
          {/* Timeline Ortodoncia */}
          <div className="relative">
            {/* Línea vertical */}
            <div className={cn(
              "absolute w-[1px] bg-[#05dd4d] top-8 bottom-8",
              activeOrtodonciaTab === "ortodoncia_morning" ? "left-4" : "right-4"
            )} />

            {/* Items del timeline */}
            <div className="relative space-y-8">
              {getTimelineData(activeOrtodonciaTab).map((item, index) => (
                <div key={index} className={cn(
                  "relative flex",
                  activeOrtodonciaTab === "ortodoncia_morning" 
                    ? "pl-12 flex-row" 
                    : "pr-12 flex-row-reverse"
                )}>
                  {/* Círculo numerado */}
                  <div className={cn(
                    "absolute w-8 h-8 bg-[#05dd4d] rounded-full flex items-center justify-center text-[#001208] font-medium",
                    activeOrtodonciaTab === "ortodoncia_morning" ? "left-0" : "right-0"
                  )}>
                    {item.step}
                  </div>

                  {/* Contenido */}
                  <div className={cn(
                    "flex-1",
                    activeOrtodonciaTab === "ortodoncia_morning" ? "pl-4 lg:pl-12" : "pr-4 lg:pr-12"
                  )}>
                    <div className="text-[#00FF66] text-sm mb-2">{item.time}</div>
                    <h3 className="text-white  font-medium mb-1">{item.title}</h3>
                    {item.speaker && (
                      <p className="text-white font-light text-sm">
                        {item.speaker}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Versión Desktop (se muestra en lg) */}
      <div className="hidden lg:block w-full max-w-[1425px] mx-auto px-4 py-12">
        {/* Tabs unidos */}
        <div className="bg-[#001208]/80 backdrop-blur-sm rounded-[32px] p-1">
          <div className="grid grid-cols-4 gap-2">
            {["dental_morning", "dental_afternoon", "ortodoncia_morning", "ortodoncia_afternoon"].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "rounded-full px-4 py-2 cursor-pointer transition-colors",
                  activeTab === tab ? "bg-[#0c231b]" : ""
                )}
              >
                <div className="text-center text-white/80 text-[16px] leading-none">
                  {tab.includes("morning") ? "Mañana" : "Tarde"}
                </div>
                <div className="text-center text-white text-[16px] font-medium uppercase leading-9">
                  {tab.includes("dental") ? "Salón Dental" : "Salón Ortodoncia"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Un solo timeline basado en el tab activo */}
        <div className="mt-10">
          <div className="relative">
            {/* Línea vertical */}
            <div className={cn(
              "absolute w-[1px] bg-[#05dd4d] top-8 bottom-8",
              {
                "left-4": activeTab === "dental_morning",
                "left-[25%]": activeTab === "dental_afternoon",
                "left-[50%]": activeTab === "ortodoncia_morning",
                "left-[75%]": activeTab === "ortodoncia_afternoon"
              }
            )} />

            {/* Items del timeline */}
            <div className={cn(
              "relative space-y-8",
              {
                "pl-0": activeTab === "dental_morning",
                "pl-[calc(25%-16px)]": activeTab === "dental_afternoon",
                "pl-[calc(50%-16px)]": activeTab === "ortodoncia_morning",
                "pl-[calc(75%-16px)]": activeTab === "ortodoncia_afternoon"
              }
            )}>
              {getTimelineData(activeTab).map((item, index) => (
                <div key={index} className="relative pl-12">
                  {/* Círculo numerado */}
                  <div className="absolute left-0 w-8 h-8 bg-[#05dd4d] rounded-full flex items-center justify-center text-[#001208] font-medium">
                    {item.step}
                  </div>

                  {/* Contenido */}
                  <div className="text-[#00FF66] text-sm mb-2">{item.time}</div>
                  <h3 className="text-white max-w-[400px] font-medium mb-1">{item.title}</h3>
                  {item.speaker && (
                    <p className="text-white font-light text-sm">
                      {item.speaker}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
