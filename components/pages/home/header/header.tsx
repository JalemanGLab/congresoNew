// src/components/header/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useHeader } from "@/components/shared/header/useHeader";
import { Menu, X } from "lucide-react";
import DesktopHeader from "@/components/shared/header/DesktopHeader";
import MobileHeader from "@/components/shared/header/MobileHeader";

export default function Header() {
  const { router, isSidebarOpen, setIsSidebarOpen, navItems } = useHeader();

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#00FF66]/10 bg-[#001208]/95 backdrop-blur supports-[backdrop-filter]:bg-[#001208]/60">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="relative w-28 md:w-36">
            <Image src="/logo.png" alt="Logo" width={140} height={60} priority className="object-contain" />
          </Link>

          <DesktopHeader navItems={navItems} />

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="border-[#00FF66]/30 text-white hover:bg-[#00FF66]/10 hover:border-[#00FF66]"
              onClick={() => router.push("/login")}
            >
              Iniciar Sesión
            </Button>
            <button
              id="menu-button"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <MobileHeader
        navItems={navItems}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        router={router}
      />

      {isSidebarOpen && <div className="fixed inset-0 bg-black/70" onClick={() => setIsSidebarOpen(false)} />}
    </>
  );
}
