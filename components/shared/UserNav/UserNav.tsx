"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useUserNav from "./useUserNav";
import { useAuthStore } from "@/store/authStore";

const UserNav = () => {
  const { user } = useAuthStore();
  const { getInitials, closeSession } = useUserNav();

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
           <a href="/dashboard/profile">Perfil</a>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex justify-between cursor-pointer"
          onClick={closeSession}
        >
          Cerrar sesion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
