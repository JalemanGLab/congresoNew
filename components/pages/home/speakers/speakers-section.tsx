"use client";

import { useState } from "react";
import { ArrowRight, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpeakerCard from "./speaker-card";
import SpeakerModal from "./speaker-modal";
import allSpeakers from "../../../shared/data/allSpeakers.json";

export default function SpeakersSection() {
  // Número de ponentes a mostrar inicialmente
  const INITIAL_SPEAKERS_COUNT = 8;

  // Estado para controlar si se muestran todos los ponentes o solo algunos
  const [showAllSpeakers, setShowAllSpeakers] = useState(false);
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string | null>(
    null
  );

  // Determinar qué ponentes mostrar basado en el estado
  const displayedSpeakers = showAllSpeakers
    ? allSpeakers
    : allSpeakers.slice(0, INITIAL_SPEAKERS_COUNT);

  return (
    <section
      id="ponentes"
      className="pt-24 bg-[#003027] relative overflow-hidden"
    >
      {/* Círculos con blur */}
      <div className="absolute inset-0 overflow-visible">
        {/* Círculo superior izquierdo */}
        <div className="absolute z-10 top-[260px] -left-[150px] w-[400px] h-[400px] rounded-full bg-[#1BEB7E] opacity-[0.25] blur-[130px]"></div>
        {/* Círculo inferior derecho */}
        <div className="absolute z-10 bottom-[100px] right-[50px] w-[200px] h-[200px] rounded-full bg-[#1BEB7E] opacity-[0.25] blur-[130px]"></div>
      
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Conferencistas
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#00FF66]/50 to-[#00FF66] mx-auto mb-6"></div>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            Conoce a los expertos que compartirán su conocimiento y experiencia
            en el Congreso Magno 3.0. Haz clic en cada conferencista para ver
            más detalles.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 content-center gap-8">
          {displayedSpeakers.map((speaker) => (
            <SpeakerCard
              key={speaker.id}
              id={speaker.id}
              name={speaker.name}
              role={speaker.role}
              image={speaker.image}
              topic={speaker.topic}
              country={speaker.country}
              onOpenModal={() => setSelectedSpeakerId(speaker.id)}
            />
          ))}
        </div>

        {/* Speaker Modals */}
        {allSpeakers.map((speaker) => (
          <SpeakerModal
            key={speaker.id}
            name={speaker.name}
            role={speaker.role}
            image={speaker.image}
            topic={speaker.topic}
            bio={speaker.bio}
            isOpen={selectedSpeakerId === speaker.id}
            onClose={() => setSelectedSpeakerId(null)}
          />
        ))}
      </div>
    </section>
  );
}
