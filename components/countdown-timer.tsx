"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  targetDate: string
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <div className="bg-[#001208] border border-[#00FF66]/20 rounded-2xl p-8 w-full aspect-square flex items-center justify-center shadow-2xl shadow-[#00FF66]/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#00FF66]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="text-6xl md:text-7xl font-bold text-[#00FF66]">{value}</span>
          </div>
          <span className="mt-6 text-white capitalize font-medium text-lg">{unit}</span>
        </div>
      ))}
    </div>
  )
}

