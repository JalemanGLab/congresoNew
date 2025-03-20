import { ReactNode } from "react";

export interface MenuItemDTO {
  text: string;
  childrenIcon: ReactNode;
  href?: string; // Para manejar enlaces en Next.js
  onClick?: () => void; // Solo se usará en "Cerrar sesión"
}
