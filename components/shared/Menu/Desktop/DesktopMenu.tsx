"use client";

import MenuItem from "./MenuItem";
import { TfiDashboard } from "react-icons/tfi";
import { IoSearchOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import {
  HiOutlinePencilSquare,
  HiOutlineUser,
  HiOutlinePower,
  HiOutlineQrCode,
} from "react-icons/hi2";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
// import { supabase } from "@/lib/supabase";
// import { useAuthStore } from "@/store/useAuthStore";

const DesktopMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();

  const closeSession = async () => {
    try {
      authService.logout();
      toast.success("Sesión cerrada correctamente");
      router.push("/login");
    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
  };

  const menuItems = [
    {
      text: "Dashboard",
      href: "/dashboard",
      icon: <TfiDashboard />,
      roles: ["admin", "superadmin"], // no mostrar a assistant
    },
    {
      text: "Buscar",
      href: "/dashboard/search",
      icon: <IoSearchOutline />,
      roles: ["admin", "superadmin", "assistant"],
    },
    {
      text: "Gestión",
      href: "/dashboard/management",
      icon: <HiOutlinePencilSquare />,
      roles: ["admin", "superadmin"],
    },
    {
      text: "Alertas",
      href: "/dashboard/alerts",
      icon: <GoBell />,
      roles: ["admin", "superadmin", "assistant"],
    },
    {
      text: "Perfil",
      href: "/dashboard/profile",
      icon: <HiOutlineUser />,
      roles: ["admin", "superadmin", "assistant"],
    },
    {
      text: "Scan QR",
      href: "/dashboard/scanqr",
      icon: <HiOutlineQrCode />,
      roles: ["admin", "superadmin"],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  return (
    <div className="flex w-full h-full flex-col justify-between rounded-lg border border-neutral-300 p-2">
      <div className="flex flex-col gap-3">
        {filteredMenuItems.map((item) => (
          <MenuItem
            key={item.href}
            text={item.text}
            href={item.href}
            childrenIcon={item.icon}
            // isActive={pathname === item.href}
          />
        ))}
      </div>
      <div className="border-t pt-2 border-neutral-300">
        <MenuItem
          text="Salir"
          childrenIcon={<HiOutlinePower />}
          onClick={closeSession}
        />
      </div>
    </div>
  );
};

export default DesktopMenu;
