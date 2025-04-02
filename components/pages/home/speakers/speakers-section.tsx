"use client"

import { useState } from "react"
import { ArrowRight, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import SpeakerCard from "./speaker-card"
import SpeakerModal from "./speaker-modal"
import allSpeakers from '../../../shared/data/allSpeakers.json'

export default function SpeakersSection() {
  // Número de ponentes a mostrar inicialmente
  const INITIAL_SPEAKERS_COUNT = 4

  // Estado para controlar si se muestran todos los ponentes o solo algunos
  const [showAllSpeakers, setShowAllSpeakers] = useState(false)
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string | null>(null)

  // Determinar qué ponentes mostrar basado en el estado
  const displayedSpeakers = showAllSpeakers ? allSpeakers : allSpeakers.slice(0, INITIAL_SPEAKERS_COUNT)

  return (
    <section id="ponentes" className="py-28 bg-[#001810] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1600')] bg-no-repeat bg-cover opacity-5"></div>
      </div>
      <div className="container relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Conferencistas</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#00FF66]/50 to-[#00FF66] mx-auto mb-6"></div>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            Conoce a los expertos que compartirán su conocimiento y experiencia en el Congreso Magno 3.0. Haz clic en
            cada conferencista para ver más detalles.
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

        <div className="mt-16 text-center">
          <Button
            variant="outline"
            className="border-[#00FF66]/30 text-white hover:bg-[#00FF66]/10 hover:border-[#00FF66] group"
            onClick={() => setShowAllSpeakers(!showAllSpeakers)}
          >
            {showAllSpeakers ? (
              <>
                Ver Menos Ponentes
                <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Ver Todos los Ponentes
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
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
  )
}

