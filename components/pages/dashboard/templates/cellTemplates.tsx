"use client"
// Importaciones necesarias
import React from "react";
import { format } from "@formkit/tempo";

// Definición de tipos
export interface DTOPayment {
  documentNumber: number;
  name: string;
  distributor: string;
  date: string;
  status: string;
  paymentStatus: string;
}

// Función auxiliar para formatear fechas en español
const formatDate = (dateString: string) => {
  return format(dateString, { date: 'long' }, 'es');
};

// Componentes de celda para la tabla de pagos
// ==========================================

// Celda para mostrar el número de documento
export const DocumentNumberCell = (row: DTOPayment): React.ReactNode => (
  <div className="font-medium text-[14px] text-neutral-600">
    {row.documentNumber}
  </div>
);

// Celda para mostrar el nombre
export const NameCell = (row: DTOPayment): React.ReactNode => (
  <div className="font-medium text-[14px] text-neutral-600">
    {row.name}
  </div>
);

// Celda para mostrar el distribuidor
export const DistributorCell = (row: DTOPayment): React.ReactNode => (
  <div className="font-medium text-[14px] text-neutral-600">
    {row.distributor}
  </div>
);

// Celda para mostrar la fecha formateada
export const DateCell = (row: DTOPayment): React.ReactNode => (
  <div className="font-medium text-[14px] text-neutral-600">
    {formatDate(row.date)}
  </div>
);

// Celda para mostrar el estado con diferentes estilos según el valor
export const StatusCell = (row: DTOPayment): React.ReactNode => (
  <span
    className={`px-2 py-1 rounded-full text-sm ${
      row.status === "registrado"
        ? "bg-neutral-200 text-neutral-700"  // Estilo para estado registrado
        : row.status === "ingreso"
        ? "bg-green-100 text-green-800"      // Estilo para estado ingreso
        : "bg-yellow-100 text-yellow-800"    // Estilo para otros estados
    }`}
  >
    {row.status}
  </span>
);

// Celda para mostrar el estado de pago con diferentes estilos según el valor
export const PaymentStatusCell = (row: DTOPayment): React.ReactNode => (
  <span
    className={`px-2 py-1 rounded-full text-sm ${
      row.paymentStatus === "pendiente"
        ? "bg-red-200 text-red-700"          // Estilo para estado pendiente
        : row.paymentStatus === "pagado"
        ? "bg-green-100 text-green-800"      // Estilo para estado pagado
        : null
    }`}
  >
    {row.paymentStatus}
  </span>
);

