"use client";

import Image from "next/image";
import Section1 from "./components/Section1/section1";
import Section2 from "./components/Section2/section2";

export default function AgendaSection() {
  return (
    <section
      id="agenda"
      className="bg-[#003027] relative w-full flex flex-col items-center justify-center gap-10"
    >
      {/* Círculos con blur */}
      {/* <div className="absolute inset-0 overflow-visible">
        {/* Círculo superior izquierdo */}
        {/* <div className="absolute z-10 -top-[150px] -left-[150px] w-[400px] h-[400px] rounded-full bg-[#1BEB7E] opacity-[0.25] blur-[130px]"></div> */}
        {/* Círculo inferior derecho */}
        {/* <div className="absolute z-10 bottom-[100px] right-[50px] w-[200px] h-[200px] rounded-full bg-[#1BEB7E] opacity-[0.25] blur-[130px]"></div> */}
        
      {/* </div> */}
      <Section1 />
      <Section2 />
    </section>
  );
}
