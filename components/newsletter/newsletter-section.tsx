"use client"

import { Button } from "@/components/ui/button"

export default function NewsletterSection() {
  return (
    <section className="py-20 bg-[#001208]">
      <div className="container">
        <div className="bg-gradient-to-r from-[#002A1A] to-[#003322] rounded-2xl p-12 border border-[#00FF66]/20 shadow-2xl shadow-[#00FF66]/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF66]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00FF66]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Mantente informado</h2>
              <p className="text-white/80">
                Suscríbete a nuestro boletín para recibir las últimas noticias, actualizaciones y ofertas especiales
                sobre el Congreso Magno 3.0.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="px-4 py-3 rounded-lg bg-[#001208] border border-[#00FF66]/20 text-white focus:outline-none focus:ring-2 focus:ring-[#00FF66]/50 min-w-[300px]"
                />
                <Button type="submit" className="bg-[#00FF66] hover:bg-[#00DD55] text-[#001208]">
                  Suscribirse
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

