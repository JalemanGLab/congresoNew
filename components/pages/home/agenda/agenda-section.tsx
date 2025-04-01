"use client";

import Image from "next/image";
import Section1 from "./components/Section1/section1";
import Section2 from "./components/Section2/section2";

export default function AgendaSection() {
  return (
    <section
      id="agenda"
      className="bg-[#001A0E] w-full flex flex-col items-center justify-center gap-10"
    >
      <Section1 />
      <Section2 />
    </section>
  );
}
