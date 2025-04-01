"use client";
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
    <div className="bg-white flex flex-col w-full h-screen overflow-hidden">
      <div className="flex flex-row h-10 px-2 items-center justify-between border-b border-neutral-200 flex-shrink-0">
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
                  <SheetTitle>Congreso Magno 3.0</SheetTitle>
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
          <div className="hidden md:flex items-center text-background h-full font-semibold">
            Congreso Magno 3.0
          </div>
        </div>

        <UserNav />
      </div>
      <div className="flex flex-row w-full h-[calc(100vh-2.5rem)] overflow-hidden">
        <div className="hidden md:flex flex-col w-16 h-full py-2 px-1 flex-shrink-0">
          <DesktopMenu />
        </div>
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
