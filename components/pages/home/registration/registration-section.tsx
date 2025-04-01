"use client";
import { useEffect, useState } from "react";
import Register from "../../../custom/modals/register/Register";
import Image from "next/image";

export default function RegistrationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (isModalOpen) {
      const currentScrollPosition = window.scrollY;
      setScrollPosition(currentScrollPosition);
      document.body.style.top = `-${currentScrollPosition}px`;
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo({
        top: scrollPosition,
        behavior: "instant",
      });
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <section
      id="registro"
      className="w-full py-6 lg:py-12 bg-gradient-to-b from-[#001208] to-[#002A1A] relative overflow-hidden"
    >
      <div className="w-full max-w-[1430px] mx-auto flex flex-col justify-center items-center lg:flex-row gap-6 lg:gap-20 px-4 ">
        <div className="w-full h-[180px] sm:h-[250px] md:h-[300px] lg:h-[600px] lg:max-w-[500px] rounded-xl lg:rounded-2xl bg-[#003b2f] relative overflow-hidden">
          <Image
            src="https://jmpukiohbcemfjqcsikc.supabase.co/storage/v1/object/sign/event/001.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJldmVudC8wMDEucG5nIiwiaWF0IjoxNzQzNDkwNDYyLCJleHAiOjE3NzUwMjY0NjJ9.ezhE_2WJI9goCnVY6WMdn0wmDrw4fYFEnWHDceWVxBI"
            alt="Doctor profesional sonriendo"
            fill
            className="object-cover object-top lg:object-center"
            priority
          />
        </div>
        <div className="flex w-full lg:w-[550px] flex-col gap-6 lg:gap-20">
          <div className="flex flex-col gap-6 lg:gap-10">
            <div className="flex flex-col gap-2 md:gap-3">
              <div className="text-xl font-semibold md:text-2xl lg:text-3xl text-[#05dd4d]">
                Sobre el evento
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-white text-xl font-semibold md:text-2xl lg:text-3xl">
                  BIENVENIDOS A MAGNO 3.0
                </div>
                <div className="text-white text-xl font-normal md:text-2xl lg:text-3xl">
                  LA CUMBRE DE LA INNOVACIÓN DONTOLÓGICA
                </div>
              </div>
            </div>
            <div className="text-white text-base font-normal md:text-lg lg:text-xl">
              EI evento odontológico más grande del año, donde expertos del
              sector presentan conferencias de vanguardia g las últimas
              tecnologías en salud dental. Una experiencia inmersiva que
              transformará la industria.
            </div>
          </div>
          <div
            onClick={() => setIsModalOpen(true)}
            className="w-[250px] h-[45px] flex justify-center items-center rounded-full font-semibold text-base bg-[#00de4c] text-[#01332b] hover:bg-[#00c544] transition-colors cursor-pointer"
          >
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
          <div className="relative flex justify-center items-center bg-gradient-to-br from-[#031a10] to-[#073723] w-full h-screen shadow-xl px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-green-400 hover:text-green-600 transition-colors z-50 hover:bg-green-500/20 rounded-sm p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Register closeModalAction={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </section>
  );
}
