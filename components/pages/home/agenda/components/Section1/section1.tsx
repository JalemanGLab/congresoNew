import Image from "next/image";

export default function Section1() {
  return (
    <div className="flex flex-col gap-10 w-full py-8 lg:flex-row items-center justify-center">
      <div className="flex w-full flex-col gap-6 items-center lg:items-start px-6 sm:px-10">
        <div className="flex flex-col items-center lg:items-start gap-4">
          <div className=" text-[#00ff66]  text-[22px] sm:text-4xl">
            CONFERENCIAS Y ACTIVIDADES
          </div>
          <div className=" text-white font-semibold text-4xl sm:text-5xl md:text-6xl leading-tight ">
            AGENDA OFICIAL DE MAGNO 3.0
          </div>
          <div className="text-white font-light text-[16px] sm:text-2xl md:text-3xl lg:text-2xl">
            Consulta la lista de conferencias y actividades destacadas de MAGNO 3.0.
          </div>
        </div>
        <a href="https://drive.google.com/drive/folders/1r4HfcKnKyTIBDj2shOFVkpQVdYBjfO0y" 
          target="_blank"
          className="flex justify-center items-center  w-[260px] h-[40px] sm:w-[300px] sm:h-[50px] text:lg sm:text-xl font-semibold  rounded-full text-[#01332b] bg-[#15d094]">
          Descarga el programa
        </a>
      </div>
      <div className="flex w-full flex-col gap-6 items-center px-6">
        <Image src={"https://jmpukiohbcemfjqcsikc.supabase.co/storage/v1/object/sign/schedule/001.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzY2hlZHVsZS8wMDEucG5nIiwiaWF0IjoxNzQzNDkwNjIyLCJleHAiOjE3NzUwMjY2MjJ9.tpZy-3FGhuSOU6LXWjiH6GEAqyrgffrudY-I32Sgzk8"} 
          alt="agenda" 
          width={1000} 
          height={1000} />
      </div>
    </div>
  );
}
