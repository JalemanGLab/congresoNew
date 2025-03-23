'use client';

import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AssistantPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== 'assistant') {
      router.replace('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Asistente</h1>
      <p className="text-center">
        Bienvenido {user?.first_name} {user?.last_name}
      </p>
      <div className="mt-8">
        {/* Aquí puedes agregar el contenido específico para asistentes */}
      </div>
    </div>
  );
} 