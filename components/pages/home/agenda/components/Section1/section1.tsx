import Image from "next/image";

export default function Section1() {
  return (
    <div className="flex flex-col gap-10 bg-[#003027] w-full max-w-[1425px] mx-auto pt-20 lg:flex-row items-center justify-center px-4">
      <div className="flex w-full flex-col gap-6 items-center lg:items-start px-6 sm:px-10">
        <div className="flex flex-col items-center lg:items-start gap-4">
          <div className=" text-[#00ff66]  text-[22px] sm:text-4xl">
            Agenda oficial
          </div>
          <div className=" text-white font-semibold text-3xl sm:text-5xl md:text-6xl leading-tight ">
            Programa y actividades destacadas
          </div>
          <div className="text-white font-light text-[16px] sm:text-2xl md:text-3xl lg:text-2xl">
            Descubre los horarios, temas g expertos que harán parte del congreso
            MAGNO 3.0. Consulta la programación completa de conferencias,
            talleres g espacios diseñados para actualizarte g conectarte con 10
            mejor de la odontología g ortodoncia.
          </div>
        </div>
        <a
          href="https://jmpukiohbcemfjqcsikc.supabase.co/storage/v1/object/sign/pdf/Agenda-Magno%203.0.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwZGYvQWdlbmRhLU1hZ25vIDMuMC5wZGYiLCJpYXQiOjE3NDM1Njg1NTQsImV4cCI6MTc3NTEwNDU1NH0.zZJF01T32JXi3g3zjQ8KPPy0ga1eqq4J-kOOquf-y3g"
          target="_blank"
          download="Agenda-Magno-3.0.pdf"
          className="flex justify-center items-center  w-[260px] h-[40px] sm:w-[300px] sm:h-[50px] text:lg sm:text-xl font-semibold  rounded-full text-[#01332b] bg-[#15d094]"
        >
          Descarga el programa
        </a>
      </div>
      <div className="flex w-full flex-col gap-6 items-center px-6">
        <Image
          src={
            "https://jmpukiohbcemfjqcsikc.supabase.co/storage/v1/object/sign/schedule/001.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzY2hlZHVsZS8wMDEucG5nIiwiaWF0IjoxNzQzNDkwNjIyLCJleHAiOjE3NzUwMjY2MjJ9.tpZy-3FGhuSOU6LXWjiH6GEAqyrgffrudY-I32Sgzk8"
          }
          alt="agenda"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}
