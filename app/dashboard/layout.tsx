'use client';

import PrivateLayout from "@/layout/PrivateLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateLayout>{children}</PrivateLayout>;
} 