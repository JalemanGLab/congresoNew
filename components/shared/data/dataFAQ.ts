import { LucideIcon } from "lucide-react";
import { Users, Zap, LifeBuoy } from "lucide-react";

// Interfaces para TypeScript
export interface Question {
  id: string;
  question: string;
  answer: string;
}

export interface FaqSection {
  id: string;
  title: string;
  icon: LucideIcon;
  questions: Question[];
}

// Datos de FAQ
export const DataFAQ: FaqSection[] = [
  {
    id: "informacion-general",
    title: "Información General",
    icon: Users,
    questions: [
      {
        id: "fecha",
        question: "¿Cuándo y dónde se realizará el congreso?",
        answer: "El Congreso Magno 3.0 se llevará a cabo del [fecha] al [fecha] en [lugar]. Las sesiones comenzarán desde las 8:00 AM hasta las 6:00 PM."
      },
      {
        id: "ubicacion",
        question: "¿Dónde se realizará el evento?",
        answer: "El evento se realizará en [lugar específico], ubicado en [dirección completa]. Contamos con estacionamiento disponible y fácil acceso al transporte público."
      }
    ]
  },
  {
    id: "registro-pagos",
    title: "Registro y Pagos",
    icon: Zap,
    questions: [
      {
        id: "registro",
        question: "¿Cómo puedo registrarme?",
        answer: `El proceso de registro es simple:
                1. Completa el formulario de inscripción en línea
                2. Realiza el pago correspondiente
                3. Recibirás un correo de confirmación
                4. Descarga tu comprobante de inscripción

                Consejo: Ten a la mano tus documentos de identificación.`
      },
      {
        id: "costos",
        question: "¿Cuál es el costo de inscripción?",
        answer: `Inscripción temprana:
                • Estudiantes: $[precio]
                • Profesionales: $[precio]
                • Grupos (+3): $[precio] c/u

                Inscripción regular:
                • Estudiantes: $[precio]
                • Profesionales: $[precio]
                • Grupos (+3): $[precio] c/u`
      }
    ]
  },
  {
    id: "soporte-ayuda",
    title: "Soporte y Ayuda",
    icon: LifeBuoy,
    questions: [
      {
        id: "contacto",
        question: "¿Cómo puedo contactar al soporte?",
        answer: `Email:
                soporte@congreso.com
                Respuesta en 24h

                Chat en vivo:
                Lun-Vie, 9:00 - 18:00
                Respuesta inmediata`
      }
    ]
  }
];

// Preguntas populares
export const popularQuestions: string[] = [
  "¿Cuándo inicia el congreso?",
  "¿Cuál es el costo de inscripción?",
  "¿Dónde se realizará el evento?",
  "¿Cómo puedo contactar al soporte?"
];
