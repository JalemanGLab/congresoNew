'use client';

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import UserNav from "@/components/shared/UserNav/UserNav";

export default function AssistantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== 'assistant') {
      router.replace('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex flex-row w-full h-12 px-2 items-center justify-between border-b border-neutral-200">
        <div className="flex flex-row w-full h-full items-center gap-4">
          <div className="flex items-center text-background h-full py-1">
            LOGO
          </div>
        </div>
        <UserNav />
      </div>
      <div className="flex flex-row w-full h-full">
        <div className="flex flex-col w-full h-full p-2">
          {children}
        </div>
      </div>
    </div>
  );
} 