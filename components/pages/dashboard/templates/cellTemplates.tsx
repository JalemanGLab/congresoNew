"use client"
// Importaciones necesarias
import React from "react";
import { format } from "@formkit/tempo";

// Definición de tipos actualizada según los datos reales
export interface DTOPayment {
  identification: number;
  first_name: string;
  last_name: string;
  distributor: string;
  entry: boolean | null;
  payment: string | null;
  payment_update: string | null;
  // Otros campos que podrían ser necesarios
  created_at: string;
}

// Función auxiliar para formatear fechas en español
const formatDate = (dateString: string | null) => {
  if (!dateString) return "No disponible";
  const date = new Date(dateString);
  const colombiaDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
  return format(colombiaDate.toISOString(), { 
    date: 'long',
    time: 'short'
  }, 'es');
};

// Componentes de celda para la tabla de pagos
// ==========================================

// Celda para mostrar el número de identificación
export const IdentificationCell = (row: DTOPayment): React.ReactNode => (
  <div className="font-medium text-[14px] text-neutral-600">
    {row.identification}
  </div>
);

// Celda para mostrar el nombre completo
export const FullNameCell = (row: DTOPayment): React.ReactNode => (
  <div className="font-medium text-[14px] text-neutral-600">
    {`${row.first_name} ${row.last_name}`}
  </div>
);

// Celda para mostrar el distribuidor
export const DistributorCell = (row: DTOPayment): React.ReactNode => (
  <div className="font-medium text-[14px] text-neutral-600">
    {row.distributor}
  </div>
);

// Celda para mostrar la fecha de registro
export const RegistrationDateCell = (row: DTOPayment): React.ReactNode => (
  <div className="font-medium text-[14px] text-neutral-600">
    {formatDate(row.created_at)}
  </div>
);

// Celda para mostrar el estado de entrada
export const EntryStatusCell = (row: DTOPayment): React.ReactNode => (
  <span
    className={`px-2 py-1 rounded-full text-sm ${
      row.entry === null || row.entry === false
        ? "bg-neutral-200 text-neutral-700"  // Estilo para "registrado"
        : "bg-green-100 text-green-800"      // Estilo para "ingresado"
    }`}
  >
    {row.entry === null || row.entry === false ? "Registrado" : "Ingresado"}
  </span>
);

// Celda para mostrar el estado de pago
export const PaymentStatusCell = (row: DTOPayment): React.ReactNode => (
  <span
    className={`px-2 py-1 rounded-full text-sm ${
      row.payment === null
        ? "bg-red-200 text-red-700"          // Estilo para "pendiente"
        : "bg-green-100 text-green-800"      // Estilo para "pagado"
    }`}
  >
    {row.payment === null ? "Pendiente" : "Pagado"}
  </span>
);

// Celda para mostrar la fecha de pago
export const PaymentDateCell = (row: DTOPayment): React.ReactNode => (
  <div className="font-medium text-[14px] text-neutral-600">
    {row.payment_update ? formatDate(row.payment_update) : "No disponible"}
  </div>
);

