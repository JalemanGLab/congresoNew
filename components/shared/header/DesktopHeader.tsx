// src/components/header/DesktopHeader.tsx
"use client";

import Link from "next/link";
import { DesktopHeaderProps } from "./type";

export default function DesktopHeader({ navItems }: DesktopHeaderProps) {
  return (
    <nav className="hidden lg:flex items-center gap-8">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-md text-white/70 hover:text-[#00FF66] transition-colors relative group"
        >
          {item.name}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00FF66] transition-all duration-300 group-hover:w-full"></span>
        </Link>
      ))}
    </nav>
  );
}
