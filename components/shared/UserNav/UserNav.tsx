"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";

const UserNav = () => {
  const { user } = useAuthStore();

  const getInitials = () => {
    if (!user?.first_name || !user?.last_name) return "AN";
    return user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>{getInitials()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium leading-none">
            {user?.first_name || "Anonimo"}
          </p>
          <p className="text-xs leading-none text-muted-foreground">
            {user?.email || "anonimo@gmail.com"}
          </p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-between cursor-pointer">
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between cursor-pointer">
          Mis Compras
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between cursor-pointer">
          Configuración
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-between cursor-pointer">
          Ayuda
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
