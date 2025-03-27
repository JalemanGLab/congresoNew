import { ScrollArea } from "@/components/ui/scroll-area";
import MenuItem from "./MenuItem";
import { TfiDashboard } from "react-icons/tfi";
import {
  HiOutlinePower,
  HiOutlineQrCode,
  HiOutlineUser,
} from "react-icons/hi2";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Image from "next/image";
import { SheetClose } from "@/components/ui/sheet";

const MobileMenu = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

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
      text: "Asistentes",
      href: "/assistants",
      icon: <TfiDashboard />,
      roles: ["admin", "superadmin"],
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
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  return (
    <div className="flex flex-col w-full h-full bg-white gap-2 pb-6">
      <ScrollArea className="w-full h-full py-2">
        <div className="flex flex-col w-full gap-2">
          {filteredMenuItems.map((item) => (
            <SheetClose key={item.href} asChild>
              <MenuItem
                text={item.text}
                onClick={() => handleNavigation(item.href)}
                childrenIcon={item.icon}
              />
            </SheetClose>
          ))}
        </div>
      </ScrollArea>

      <div className="flex w-full">
        <SheetClose asChild>
          <MenuItem
            text="Salir"
            onClick={closeSession}
            childrenIcon={<HiOutlinePower />}
          />
        </SheetClose>
      </div>
    </div>
  );
};

export default MobileMenu;
