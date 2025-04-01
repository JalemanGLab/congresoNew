"use client"
import { useEffect, useState } from "react"
import Register from "../../../custom/modals/register/Register"
import Image from "next/image"

export default function RegistrationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    if (isModalOpen) {
      const currentScrollPosition = window.scrollY
      setScrollPosition(currentScrollPosition)
      document.body.style.top = `-${currentScrollPosition}px`
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      window.scrollTo({
        top: scrollPosition,
        behavior: 'instant'
      })
    }

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  return (
    <section id="registro" className="w-full py-10 lg:py-20 bg-gradient-to-b from-[#001208] to-[#002A1A] relative overflow-hidden">
      <div className="w-full flex flex-col justify-center items-center lg:flex-row gap-10 lg:gap-28 px-5 sm:px-10 lg:px-24">
        <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[800px] lg:max-w-[680px]  rounded-2xl lg:rounded-none bg-[#003b2f] relative overflow-hidden">
          <Image 
            src="https://jmpukiohbcemfjqcsikc.supabase.co/storage/v1/object/sign/event/001.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJldmVudC8wMDEucG5nIiwiaWF0IjoxNzQzNDkwNDYyLCJleHAiOjE3NzUwMjY0NjJ9.ezhE_2WJI9goCnVY6WMdn0wmDrw4fYFEnWHDceWVxBI"
            alt="Doctor profesional sonriendo"
            fill
            className="object-cover  object-top lg:object-center lg:object-none"
            
          />
        </div>
        <div className="flex w-full lg:w-[700px] flex-col gap-10 lg:gap-40">
          <div className="flex flex-col gap-10 lg:gap-20">
            <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
              <div className="text-2xl font-semibold md:text-3xl lg:text-4xl xl:text-5xl text-[#05dd4d]">Sobre el evento</div>
              <div className="flex flex-col ">
                <div className="text-white text-2xl font-semibold md:text-3xl lg:text-5xl">BIENVENIDOS A MAGNO 3.0</div>
                <div className="text-white text-2xl font-normal md:text-3xl lg:text-5xl">LA CUMBRE DE LA INNOVACIÓN DONTOLÓGICA</div>
              </div>
            </div>
            <div className="text-white text-lg font-normal md:text-xl lg:text-2xl">
              EI evento odontológico más grande del año, donde
              expertos del sector presentan conferencias de vanguardia
              g las últimas tecnologías en salud dental. Una experiencia
              inmersiva que transformará la industria.
            </div>
          </div>
          <div onClick={() => setIsModalOpen(true)} className="w-[300px] h-[50px] flex justify-center items-center rounded-full font-bold text-lg bg-[#00de4c] text-[#01332b]">
            Vive la experiencia
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed left-0 top-0 right-0 bottom-0 inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative flex justify-center items-center bg-gradient-to-br from-[#031a10] to-[#073723] w-full h-screen shadow-xl px-10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-green-400 hover:text-green-600 transition-colors z-50 hover:bg-green-500/20 rounded-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Register closeModalAction={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </section>
  )
}

