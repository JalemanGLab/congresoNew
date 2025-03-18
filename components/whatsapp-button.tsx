"use client"

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  const phoneNumber = "3224685663"
  const message = "Hola, estoy interesado en el Congreso Magno 3.0. ¿Podrían brindarme más información?"

  const handleWhatsappClick = () => {
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")
  }

  return (
    <button
      onClick={handleWhatsappClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className="h-8 w-8" />
      <span className="absolute right-full mr-3 bg-[#25D366]  text-white text-sm py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Contáctanos
      </span>
    </button>
  )
}

