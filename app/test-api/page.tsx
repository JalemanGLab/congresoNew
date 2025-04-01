"use client";

import React from 'react';
import TestComponent from '@/components/custom/TestComponent';

export default function TestApiPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">Página de Prueba API</h1>
      <TestComponent />
    </main>
  );
}
