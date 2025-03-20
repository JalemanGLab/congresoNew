"use client";

import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useEvent } from "./useEvent";

export default function EventSection() {
  const { handleOpenMap, eventData } = useEvent();

  return (
    <section
      id="evento"
      className="py-16 md:py-20 lg:py-28 bg-gradient-to-b from-[#002A1A] to-[#001810] relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1600')] bg-no-repeat bg-cover opacity-5"></div>
      </div>
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

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {eventData.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-[#001208] p-6 rounded-xl border border-[#00FF66]/10 shadow-lg h-full"
                >
                  <h4 className="text-[#00FF66] font-medium mb-3 text-lg">
                    {feature.title}
                  </h4>
                  <p className="text-white/70">
                    {feature.description}
                  </p>
                </div>
              ))}
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
