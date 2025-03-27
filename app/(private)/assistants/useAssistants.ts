"use client";
import {
  IdentificationCell,
  FullNameCell,
  DistributorCell,
  RegistrationDateCell,
  PaymentStatusCell,
  EntryStatusCell,
  PaymentDateCell,
} from "@/components/pages/dashboard/templates/cellTemplates";
import { getAssistants } from "@/services/asisstantService";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

const useAssistants = () => {
  const [assistants, setAssistants] = useState<any>([]);
  const { isAuthenticated, token, user } = useAuthStore();

  useEffect(() => {
    const role = user?.role;
    if (
      isAuthenticated &&
      token &&
      role &&
      ["admin", "superadmin"].includes(role)
    ) {
      getAssistantsData();
    }
  }, [isAuthenticated, token, user?.role]);

  const columns = [
    {
      header: "# Documento",
      accessor: "documentNumber",
      cell: IdentificationCell,
    },
    {
      header: "Nombre",
      accessor: "name",
      cell: FullNameCell,
    },
    {
      header: "Distribuidor",
      accessor: "distributor",
      cell: DistributorCell,
    },
    {
      header: "Fecha de Registro",
      accessor: "date",
      cell: RegistrationDateCell,
    },
    {
      header: "Estado de Ingreso",
      accessor: "status",
      cell: EntryStatusCell,
    },
    {
      header: "Estado de Pago",
      accessor: "paymentStatus",
      cell: PaymentStatusCell,
    },
    {
      header: "Fecha de Pago",
      accessor: "paymentDate",
      cell: PaymentDateCell,
    },
  ];

  const getAssistantsData = async () => {
    try {
      const response = await getAssistants();
      setAssistants(response.data);
    } catch (error: any) {
      toast.error("Error al obtener asistentes");
      setAssistants([]);
    }
  };

  return {
    columns,
    assistants,
  };
};

export default useAssistants;
