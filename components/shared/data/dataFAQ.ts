import { LucideIcon } from "lucide-react";
import { Users, Zap, LifeBuoy, Calendar, CreditCard, QrCode, Mic, ShoppingBag, RefreshCw, Video, HelpCircle } from "lucide-react";

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

// Datos de FAQS
export const DataFAQ: FaqSection[] = [
  {
    id: "informacion-evento",
    title: "Información del Evento",
    icon: Users,
    questions: [
      {
        id: "fecha-ubicacion",
        question: "¿Cuándo y dónde se llevará a cabo MAGNO 3.0?",
        answer: "El evento se realizará en Centro Interactivo Maloka, Cra. 68d #24A - 51, Bogotá, 11 Junio 2025 con actividades programadas entre las 8:00 am hasta las 6:00pm aproximadamente."
      },
      {
        id: "conferencistas",
        question: "¿Quiénes serán los conferencistas y qué temas abordarán?",
        answer: "Contamos con expertos líderes en odontología y ortodoncia. Puedes consultar la lista completa y los temas en la sección Agenda y Conferencistas de nuestro sitio."
      },
      {
        id: "transmision",
        question: "¿Habrá transmisión en línea o solo será presencial?",
        answer: "MAGNO 3.0 es un evento 100% presencial, diseñado para brindar una experiencia inmersiva única."
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
        question: "¿Cómo puedo registrarme y comprar mi entrada?",
        answer: "Puedes registrarte y comprar tu entrada a través de nuestra landing page congresomagnocolombia.com, donde encontrarás el botón 'Comprar tu entrada' o 'Regístrate ahora' con un proceso de pago seguro."
      },
      {
        id: "metodos-pago",
        question: "¿Cuáles son los métodos de pago disponibles?",
        answer: "Aceptamos pagos con tarjeta de crédito y PSE."
      },
      {
        id: "comprobante",
        question: "¿Recibiré un comprobante después de mi registro?",
        answer: "Sí, recibirás un correo de confirmación con tu entrada digital y un Save the Date del evento."
      },
      {
        id: "redencion",
        question: "¿Puedo redimir el valor de mi entrada en productos de los patrocinadores?",
        answer: "Al comprar tu entrada, eliges un proveedor asociado. Durante el evento, podrás redimir el monto de tu inscripción exclusivamente con el proveedor seleccionado."
      },
      {
        id: "reembolso",
        question: "¿Hay reembolsos en caso de que no pueda asistir?",
        answer: "No ofrecemos reembolsos, pero puedes transferir tu entrada a otra persona notificándonos con anticipación."
      }
    ]
  },
  {
    id: "acceso-soporte",
    title: "Acceso y Soporte",
    icon: LifeBuoy,
    questions: [
      {
        id: "check-in",
        question: "¿Cómo funciona el módulo de check-in y acceso al evento?",
        answer: "Al llegar, escanea tu código QR en la entrada para validar tu registro y acceder al evento de manera rápida y segura."
      },
      {
        id: "contacto",
        question: "¿Dónde puedo obtener más información o resolver dudas?",
        answer: "Puedes contactarnos a través de nuestro WhatsApp [Link de Whatsapp]"
      }
    ]
  }
];
