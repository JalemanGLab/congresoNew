"use client"

import CountdownTimer from "./countdown-timer"
import Threads from "../../../Threads"

export default function CountdownSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[#0c1d14]"></div>
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          <Threads
            color={[2/255, 180/255, 108/255]}
            amplitude={4}
            distance={0.2}
            enableMouseInteraction={false}
          />
        </div>
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

