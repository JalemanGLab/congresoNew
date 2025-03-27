// src/components/header/useHeader.ts
import { useRouter } from "next/navigation";
import { useState, useEffect} from "react";
import { NavItem, HeaderHookResult } from "./type";

export const useHeader = (): HeaderHookResult => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { name: "Inicio", href: "#inicio" },
    { name: "Registro", href: "#registro" },
    { name: "Agenda", href: "#agenda" },
    { name: "Ponentes", href: "#ponentes" },
    { name: "Productos", href: "#productos" },
    { name: "FAQ", href: "#preguntas" },
  ];

  const handleLoginClick = () => {
    router.push("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      // Cerrar sidebar cuando el ancho de pantalla se vuelve de escritorio
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    router,
    isSidebarOpen,
    setIsSidebarOpen,
    handleLoginClick,
    navItems
  };
};
