"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
// import solventum from "../assets/img/solventum.svg";
import UserNav from "@/components/shared/UserNav/UserNav";
import DesktopMenu from "@/components/shared/Menu/Desktop/DesktopMenu";
import MobileMenu from "@/components/shared/Menu/Mobile/MobileMenu";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-screen overflow-x-hidden">
      <div className="flex flex-row h-12 px-2 items-center justify-between border-b border-neutral-200">
        <div className="flex flex-row w-full h-full items-center gap-4">
          <div className="md:hidden flex flex-row h-full items-center">
            <Sheet>
              <SheetTrigger>
                <div className="flex cursor-pointer w-8 h-8 rounded text-background items-center justify-center">
                  <HiOutlineMenuAlt2 className="size-5" />
                </div>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px]">
                <SheetHeader>
                  <SheetTitle>LOGO</SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>
                <MobileMenu />
                <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70  transition-opacity hover:opacity-100 focus:outline-none  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Cerrar menú</span>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>
          <div className="hidden md:flex items-center text-background h-full py-1">
            {/* <img src={solventum} alt="solventum" className="h-full" /> */}
            LOGO
          </div>
        </div>

        <UserNav />
      </div>
      <div className="flex flex-row w-full h-full">
        <div className="hidden md:flex flex-col w-20 h-full p-2">
          <DesktopMenu />
        </div>
        <div className="flex flex-col w-full h-full p-2">{children}</div>
      </div>
    </div>
  );
}
