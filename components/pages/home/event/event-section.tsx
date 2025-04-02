"use client";

import { Button } from "@/components/ui/button";
import { Clock, Ticket, Calendar, MapPin } from "lucide-react";
import { useEvent } from "./useEvent";

export default function EventSection() {
  const { handleOpenMap, eventData } = useEvent();

  return (
    <section
      id="evento"
      className="py-16 md:py-20 lg:py-28 relative overflow-hidden bg-[#003027]"
    >
      {/* <div className="absolute inset-0 overflow-visible">
        {/* Círculo superior izquierdo */}
        {/* <div className="absolute z-10 top-[260px] -left-[150px] w-[400px] h-[400px] rounded-full bg-[#1BEB7E] opacity-[0.25] blur-[130px]"></div> */}
        {/* Círculo inferior derecho */}
        {/* <div className="absolute z-10 bottom-[100px] right-[50px] w-[200px] h-[200px] rounded-full bg-[#1BEB7E] opacity-[0.25] blur-[130px]"></div> */}
      {/* </div> */}

      <div className="container relative z-10">
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            {eventData.title}
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#00FF66]/50 to-[#00FF66] mx-auto mb-6"></div>
          <p className="text-white/80 max-w-3xl mx-auto text-base lg:text-lg">
            {eventData.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ">
          <div className="rounded-2xl overflow-hidden h-[300px] lg:h-[500px] relative shadow-2xl shadow-[#00FF66]/5 border border-[#00FF66]/10">
            <iframe
              src={eventData.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              {eventData.subtitle}
            </h3>
            <p className="text-white/80 text-base lg:text-lg leading-relaxed">
              {eventData.mainText}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-[#001208]/80 backdrop-blur-sm p-6 rounded-xl border border-[#00FF66]/20 shadow-lg flex flex-col items-center text-center group hover:border-[#00FF66]/40 transition-all">
                <div className="h-14 w-14 rounded-full bg-[#00FF66]/10 flex items-center justify-center mb-4 group-hover:bg-[#00FF66]/20 transition-colors">
                  <Calendar className="h-7 w-7 text-[#00FF66]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">Fecha</h3>
                <p className="text-white/80">15 de Julio, 2025</p>
              </div>

              <div className="bg-[#001208]/80 backdrop-blur-sm p-6 rounded-xl border border-[#00FF66]/20 shadow-lg flex flex-col items-center text-center group hover:border-[#00FF66]/40 transition-all">
                <div className="h-14 w-14 rounded-full bg-[#00FF66]/10 flex items-center justify-center mb-4 group-hover:bg-[#00FF66]/20 transition-colors">
                  <Clock className="h-7 w-7 text-[#00FF66]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">Horario</h3>
                <p className="text-white/80">9:00 AM - 6:00 PM</p>
              </div>

              <div className="bg-[#001208]/80 backdrop-blur-sm p-6 rounded-xl border border-[#00FF66]/20 shadow-lg flex flex-col items-center text-center group hover:border-[#00FF66]/40 transition-all">
                <div className="h-14 w-14 rounded-full bg-[#00FF66]/10 flex items-center justify-center mb-4 group-hover:bg-[#00FF66]/20 transition-colors">
                  <MapPin className="h-7 w-7 text-[#00FF66]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">Ubicación</h3>
                <p className="text-white/80">Centro de Convenciones, Bogotá</p>
              </div>

              <div className="bg-[#001208]/80 backdrop-blur-sm p-6 rounded-xl border border-[#00FF66]/20 shadow-lg flex flex-col items-center text-center group hover:border-[#00FF66]/40 transition-all">
                <div className="h-14 w-14 rounded-full bg-[#00FF66]/10 flex items-center justify-center mb-4 group-hover:bg-[#00FF66]/20 transition-colors">
                  <Ticket className="h-7 w-7 text-[#00FF66]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">Entradas</h3>
                <p className="text-white/80">Limitadas (1000 disponibles)</p>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleOpenMap}
                className="w-full mx-auto bg-[#00FF66] hover:bg-[#00DD55] text-[#001208] group transition-all duration-300 ease-in-out text-base"
              >
                Cómo Llegar
                <MapPin className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
