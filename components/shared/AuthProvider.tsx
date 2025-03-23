'use client';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { token, user, isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    if (token && user && isAuthenticated && pathname === '/login') {
      router.replace('/dashboard');
      return;
    }

    if (!token && !isAuthenticated && pathname.startsWith('/dashboard')) {
      router.replace('/login');
      return;
    }
  }, [pathname, token, isAuthenticated]);

  // No renderizar nada del dashboard si no está autenticado
  if (pathname.startsWith('/dashboard') && (!token || !isAuthenticated)) {
    return null;
  }

  return children;
} 