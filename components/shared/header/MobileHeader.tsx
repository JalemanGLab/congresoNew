// src/components/header/MobileHeader.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";
import { MobileHeaderProps } from "./type";

export default function MobileHeader({ navItems, isSidebarOpen, setIsSidebarOpen, router }: MobileHeaderProps) {
  return (
    <div id="mobile-sidebar" className={`fixed top-0 right-0 z-50 h-full w-72 bg-[#001208] transition-transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex flex-col h-full text-white px-4 py-6">
        <div className="flex justify-between items-center border-b border-white/20 pb-4">
          <div>
            <h2 className="text-[#00FF66] text-xl font-bold">Congreso Magno</h2>
            <p className="text-sm text-gray-400">15 de Julio, 2025</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)}>
            <X className="h-8 w-8 p-1 rounded-sm hover:text-green-400 hover:bg-green-900 text-white" />
          </button>
        </div>

        <nav className="py-4 flex-grow space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center justify-between py-3 px-4 rounded-sm text-white hover:bg-[#00330F] hover:text-[#00FF66]"
              onClick={() => setIsSidebarOpen(false)}
            >
              <span>{item.name}</span>
              <ArrowRight className="h-4 w-4 text-transparent group-hover:text-[#00FF66] transition-colors duration-200" />
            </Link>
          ))}
        </nav>
        <div className="border-t border-gray-400 pt-4 text-center">
          <p className="text-sm text-gray-400">¿Ya tienes una cuenta?</p>
          <Button
            variant="outline"
            className="w-full mt-2 border-[#00FF66]/30 text-white hover:bg-[#00FF66]/10 hover:border-[#00FF66]"
            onClick={() => router.push("/login")}
          >
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
}
