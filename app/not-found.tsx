"use client"
import Threads from "@/components/Threads";

export default function NotFound() {
    return (
        <section className="fixed inset-0 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[#0c1d14]"/>
                <div className="absolute top-0 left-0 w-full h-full">
                    <Threads
                        color={[2 / 255, 180 / 255, 108 / 255]}
                        amplitude={4}
                        distance={0.5}
                        enableMouseInteraction={false}
                    />
                </div>
                <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-4">
                    <h1 className="text-7xl md:text-8xl xl:text-9xl font-bold text-[#00ff66] leading-tight">404</h1>
                    <p className="text-md md:text-lg xl:text-xl my-4 text-white">Página no encontrada.</p>
                    <a
                        href="/"
                        className="mt-1 border-[#00FF66] bg-[#0c1d14] border-2 py-2 px-4 rounded-lg text-sm md:text-base xl:text-lg text-white hover:bg-[#00FF66]/10 hover:border-[#00FF66] transition-all duration-300"
                    >
                        Volver al inicio
                    </a>
                </div>
            </div>
        </section>
    )
}
