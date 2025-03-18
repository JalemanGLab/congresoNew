"use client"

import Image from "next/image"

export default function AgendaSection() {
  return (
    <section id="agenda" className="bg-[#001A0E] relative overflow-hidden h-screen">
      {/* Fondo con patrón de líneas onduladas */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QjrWrdwPXiIPwxC4yuRPasKoax35AJ.png"
          alt="Background pattern"
          fill
          className="object-cover"
        />
      </div>

  
    </section>
  )
}

