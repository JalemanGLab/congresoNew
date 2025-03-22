// src/components/header/useHeader.ts
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NavItem, HeaderHookResult } from "./type";

export const useHeader = (): HeaderHookResult => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { name: "Inicio", href: "#inicio" },
    { name: "Evento", href: "#evento" },
    { name: "Agenda", href: "#agenda" },
    { name: "Ponentes", href: "#ponentes" },
    { name: "Productos", href: "#productos" },
    { name: "FAQ", href: "#preguntas" },
  ];

  const handleLoginClick = () => {
    router.push("/login");
  };

  return {
    router,
    isSidebarOpen,
    setIsSidebarOpen,
    handleLoginClick,
    navItems
  };
};
