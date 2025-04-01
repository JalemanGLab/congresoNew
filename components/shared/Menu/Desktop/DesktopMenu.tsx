"use client";

import MenuItem from "./MenuItem";
import { TfiDashboard } from "react-icons/tfi";
import {
  HiOutlineUser,
  HiOutlinePower,
  HiOutlineQrCode,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

const DesktopMenu = () => {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  const closeSession = async () => {
    try {
      await authService.logout();
      toast.success("Sesión cerrada correctamente");
      setTimeout(() => {
        router.replace("/login");
      }, 100);
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
      text: "Perfil",
      href: "/profile",
      icon: <HiOutlineUser />,
      roles: ["admin", "superadmin", "assistant"],
    },
    {
      text: "Scan QR",
      href: "/scanqr",
      icon: <HiOutlineQrCode />,
      roles: ["admin", "superadmin"],
    },
    {
      text: "Reportes",
      href: "/reports",
      icon: <HiOutlineDocumentText />,
      roles: ["admin", "superadmin"],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  return (
    <div className="bg-white flex w-full h-full flex-col justify-between rounded-lg border border-neutral-300 p-2">
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
