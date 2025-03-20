"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import SpeakerCard from "./speaker-card"
import SpeakerModal from "./speaker-modal"

// Datos de todos los ponentes
const allSpeakers = [
  {
    id: "speaker1",
    name: "Ana Martínez",
    role: "CEO de Innovatech",
    image: "/placeholder.svg?height=400&width=400",
    topic: "Transformación Digital",
    bio: "Ana Martínez es una reconocida experta en transformación digital con más de 15 años de experiencia en el sector odontológico. Como CEO de Innovatech, ha liderado proyectos de digitalización en más de 200 clínicas dentales en toda Latinoamérica.",
    schedule: "15 de Julio, 10:00 AM - 11:30 AM",
    location: "Sala Principal",
    achievements: [
      "Premio a la Innovación Tecnológica 2023",
      "Autora del libro 'Odontología Digital'",
      "Más de 50 conferencias internacionales",
    ],
  },
  {
    id: "speaker2",
    name: "Carlos Rodríguez",
    role: "Director de Estrategia",
    image: "/placeholder.svg?height=400&width=400",
    topic: "Liderazgo Empresarial",
    bio: "Carlos Rodríguez es Director de Estrategia en una de las redes de clínicas dentales más importantes de Colombia. Su experiencia en gestión empresarial y liderazgo ha transformado la manera en que se administran las clínicas modernas.",
    schedule: "15 de Julio, 12:00 PM - 1:30 PM",
    location: "Sala de Conferencias B",
    achievements: [
      "MBA en Administración de Servicios de Salud",
      "Consultor de más de 50 clínicas en Latinoamérica",
      "Creador del método 'Dental Business Growth'",
    ],
  },
  {
    id: "speaker3",
    name: "Laura Gómez",
    role: "Experta en Marketing",
    image: "/placeholder.svg?height=400&width=400",
    topic: "Estrategias de Crecimiento",
    bio: "Laura Gómez es especialista en marketing digital para el sector odontológico. Ha desarrollado estrategias de crecimiento para más de 300 consultorios dentales, logrando aumentar su captación de pacientes en un promedio del 40%.",
    schedule: "15 de Julio, 2:30 PM - 4:00 PM",
    location: "Sala de Conferencias A",
    achievements: [
      "Certificada en Marketing Digital por Google",
      "Creadora del programa 'Dental Marketing Pro'",
      "Columnista en revistas especializadas del sector",
    ],
  },
  {
    id: "speaker4",
    name: "Javier Moreno",
    role: "Consultor Internacional",
    image: "/placeholder.svg?height=400&width=400",
    topic: "Tendencias Globales",
    bio: "Javier Moreno es un reconocido consultor internacional especializado en tendencias del sector odontológico. Ha visitado más de 30 países estudiando las últimas innovaciones y prácticas en odontología moderna.",
    schedule: "15 de Julio, 4:30 PM - 6:00 PM",
    location: "Auditorio Principal",
    achievements: [
      "Doctor en Odontología con especialización en Implantología",
      "Autor de 3 libros sobre innovación en odontología",
      "Conferencista en los principales congresos internacionales",
    ],
  },
  {
    id: "speaker5",
    name: "María López",
    role: "Especialista en Implantología",
    image: "/placeholder.svg?height=400&width=400",
    topic: "Implantes Dentales Avanzados",
    bio: "María López es una reconocida especialista en implantología con más de 12 años de experiencia. Ha realizado más de 3,000 procedimientos de implantes y es pionera en técnicas mínimamente invasivas.",
    schedule: "15 de Julio, 11:00 AM - 12:30 PM",
    location: "Sala de Conferencias C",
    achievements: [
      "Miembro de la Asociación Internacional de Implantología",
      "Creadora del protocolo 'Implante Express'",
      "Docente en la Universidad Nacional de Odontología",
    ],
  },
  {
    id: "speaker6",
    name: "Roberto Sánchez",
    role: "Director Clínico",
    image: "/placeholder.svg?height=400&width=400",
    topic: "Gestión de Clínicas Dentales",
    bio: "Roberto Sánchez es director clínico de una de las redes de clínicas más grandes de Latinoamérica. Su enfoque en la optimización de procesos ha revolucionado la forma de gestionar clínicas dentales modernas.",
    schedule: "15 de Julio, 2:00 PM - 3:30 PM",
    location: "Sala Principal",
    achievements: [
      "Implementación de sistemas de gestión en más de 50 clínicas",
      "Autor del libro 'Clínicas Dentales Eficientes'",
      "Premio a la Innovación en Gestión Sanitaria 2023",
    ],
  },
  {
    id: "speaker7",
    name: "Elena Ramírez",
    role: "Ortodoncista",
    image: "/placeholder.svg?height=400&width=400",
    topic: "Ortodoncia Digital",
    bio: "Elena Ramírez es especialista en ortodoncia digital y ha sido pionera en la implementación de tecnologías 3D para el diagnóstico y tratamiento ortodóntico. Su enfoque combina la precisión digital con la experiencia clínica.",
    schedule: "15 de Julio, 9:30 AM - 11:00 AM",
    location: "Sala de Conferencias A",
    achievements: [
      "Certificada en sistemas de alineadores invisibles",
      "Desarrolladora del software 'OrthoDigital'",
      "Más de 1,000 casos tratados con tecnología digital",
    ],
  },
  {
    id: "speaker8",
    name: "Daniel Torres",
    role: "Investigador",
    image: "/placeholder.svg?height=400&width=400",
    topic: "Biomateriales Dentales",
    bio: "Daniel Torres lidera investigaciones en el campo de los biomateriales dentales. Su trabajo se centra en el desarrollo de materiales biocompatibles que mejoran la integración y durabilidad de las restauraciones dentales.",
    schedule: "15 de Julio, 3:30 PM - 5:00 PM",
    location: "Sala de Conferencias B",
    achievements: [
      "PhD en Biomateriales por la Universidad de Barcelona",
      "15 publicaciones científicas en revistas indexadas",
      "Patente de material bioactivo para regeneración ósea",
    ],
  },
  {
    id: "speaker9",
    name: "Sofía Mendoza",
    role: "Endodoncista",
    image: "/placeholder.svg?height=400&width=400",
    topic: "Endodoncia Microscópica",
    bio: "Sofía Mendoza es referente en endodoncia microscópica, utilizando tecnología de última generación para tratamientos de conductos complejos. Su precisión y técnica han establecido nuevos estándares en la especialidad.",
    schedule: "15 de Julio, 1:00 PM - 2:30 PM",
    location: "Sala de Conferencias D",
    achievements: [
      "Especialista en microcirugía endodóntica",
      "Creadora del curso 'Endodoncia bajo microscopio'",
      "Miembro de la Sociedad Europea de Endodoncia",
    ],
  },
]

export default function SpeakersSection() {
  // Número de ponentes a mostrar inicialmente
  const INITIAL_SPEAKERS_COUNT = 4

  // Estado para controlar si se muestran todos los ponentes o solo algunos
  const [showAllSpeakers, setShowAllSpeakers] = useState(false)
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string | null>(null)

  // Estado para almacenar los ponentes en orden aleatorio
  const [randomizedSpeakers, setRandomizedSpeakers] = useState(allSpeakers)

  // Función para aleatorizar el orden de los ponentes
  const randomizeSpeakers = () => {
    const shuffled = [...allSpeakers].sort(() => Math.random() - 0.5)
    setRandomizedSpeakers(shuffled)
  }

  // Aleatorizar los ponentes al cargar el componente
  useEffect(() => {
    randomizeSpeakers()
  }, [])

  // Determinar qué ponentes mostrar basado en el estado
  const displayedSpeakers = showAllSpeakers ? randomizedSpeakers : randomizedSpeakers.slice(0, INITIAL_SPEAKERS_COUNT)

  return (
    <section id="ponentes" className="py-28 bg-[#001810] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1600')] bg-no-repeat bg-cover opacity-5"></div>
      </div>
      <div className="container relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ponentes Destacados</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#00FF66]/50 to-[#00FF66] mx-auto mb-6"></div>
          <p className="text-white/80 max-w-3xl mx-auto text-lg">
            Conoce a los expertos que compartirán su conocimiento y experiencia en el Congreso Magno 3.0. Haz clic en
            cada ponente para ver más detalles.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayedSpeakers.map((speaker) => (
            <SpeakerCard
              key={speaker.id}
              id={speaker.id}
              name={speaker.name}
              role={speaker.role}
              image={speaker.image}
              topic={speaker.topic}
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
            id={speaker.id}
            name={speaker.name}
            role={speaker.role}
            image={speaker.image}
            topic={speaker.topic}
            bio={speaker.bio}
            schedule={speaker.schedule}
            location={speaker.location}
            achievements={speaker.achievements}
            isOpen={selectedSpeakerId === speaker.id}
            onClose={() => setSelectedSpeakerId(null)}
          />
        ))}
      </div>
    </section>
  )
}

