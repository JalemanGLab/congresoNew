"use client"

import CountdownTimer from "./countdown-timer"

export default function CountdownSection() {
  return (
    <section className="py-16 bg-[#001208] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=800&width=1600')] bg-no-repeat bg-cover opacity-5"></div>
      </div>
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">El evento comienza en</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#00FF66]/50 to-[#00FF66] mx-auto mb-6"></div>
        </div>
        <CountdownTimer targetDate="2025-06-11T09:00:00" />
      </div>
    </section>
  )
}

