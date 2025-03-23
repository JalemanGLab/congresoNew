'use client'
import { IdentificationCell , FullNameCell, DistributorCell, RegistrationDateCell, PaymentStatusCell, EntryStatusCell, PaymentDateCell } from "@/components/pages/dashboard/templates/cellTemplates";
import { getAssistants } from "@/services/asisstantService";
import { useEffect, useState } from "react";

const useDashboard = () => {

    const [assistants, setAssistants] = useState<any>([]);
    useEffect(() => {
        getAssistantsData();
    }, []);

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
    
    const getAssistantsData = async (): Promise<any> => {
        try {
            const response = await getAssistants();
            setAssistants(response.data);
            console.log(response);
        } catch (error) {
            console.error("Error al obtener asistentes:", error);
            return [];
        }
    }

    

    return {
        columns,
        assistants
    };
};

export default useDashboard;
