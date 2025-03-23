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

    const data = [
        {
            "documentNumber": 1,
            "name": "Ana María González",
            "distributor": "Distribuidora Norte S.A.",
            "date": "2024-03-15",
            "status": "registrado",
            "paymentStatus": "pendiente"
        },
        {
            "documentNumber": 2,
            "name": "Carlos Rodríguez Pérez",
            "distributor": "Comercial del Sur",
            "date": "2024-04-20",
            "status": "registrado",
            "paymentStatus": "pagado"
        },
        {
            "documentNumber": 3,
            "name": "Laura Martínez Silva",
            "distributor": "Distribuciones Centro",
            "date": "2024-03-10",
            "status": "registrado",
            "paymentStatus": "pendiente"
        },
        {
            "documentNumber": 4,
            "name": "Miguel Ángel Sánchez",
            "distributor": "Distribuidora Norte S.A.",
            "date": "2024-05-01",
            "status": "ingreso",
            "paymentStatus": "pagado"
        },
        {
            "documentNumber": 5,
            "name": "Isabel Torres Ruiz",
            "distributor": "Mayorista Express",
            "date": "2024-06-15",
            "status": "ingreso",
            "paymentStatus": "pagado"
        },
        {
            "documentNumber": 6,
            "name": "Francisco Morales",
            "distributor": "Comercial del Sur",
            "date": "2024-04-22",
            "status": "ingreso",
            "paymentStatus": "pagado"
        },
        {
            "documentNumber": 7,
            "name": "Patricia Vega Luna",
            "distributor": "Distribuciones Centro",
            "date": "2024-03-28",
            "status": "ingreso",
            "paymentStatus": "pendiente"
        },
        {
            "documentNumber": 8,
            "name": "Roberto Díaz Castro",
            "distributor": "Mayorista Express",
            "date": "2024-05-05",
            "status": "ingreso",
            "paymentStatus": "pendiente"
        },
        {
            "documentNumber": 9,
            "name": "Carmen Flores Medina",
            "distributor": "Distribuidora Nacional",
            "date": "2024-06-20",
            "status": "registrado",
            "paymentStatus": "pendiente"
        },
        {
            "documentNumber": 10,
            "name": "José Luis Ramírez",
            "distributor": "Comercial del Sur",
            "date": "2024-04-25",
            "status": "registrado",
            "paymentStatus": "pendiente"
        },
        {
            "documentNumber": 11,
            "name": "María Fernanda López",
            "distributor": "Distribuidora Norte S.A.",
            "date": "2024-03-30",
            "status": "registrado",
            "paymentStatus": "pagado"
        },
        {
            "documentNumber": 12,
            "name": "Daniel Herrera Ortiz",
            "distributor": "Distribuciones Centro",
            "date": "2024-05-10",
            "status": "registrado",
            "paymentStatus": "pagado"
        },
        {
            "documentNumber": 13,
            "name": "Sofía Mendoza Cruz",
            "distributor": "Distribuidora Nacional",
            "date": "2024-06-25",
            "status": "registrado",
            "paymentStatus": "pagado"
        },
        {
            "documentNumber": 14,
            "name": "Alejandro Vargas",
            "distributor": "Mayorista Express",
            "date": "2024-04-28",
            "status": "registrado",
            "paymentStatus": "pendiente"
        },
        {
            "documentNumber": 15,
            "name": "Valentina Rivas",
            "distributor": "Distribuidora Norte S.A.",
            "date": "2024-04-02",
            "status": "registrado",
            "paymentStatus": "pendiente"
        },
        {
            "documentNumber": 16,
            "name": "Eduardo Castro Mora",
            "distributor": "Comercial del Sur",
            "date": "2024-05-15",
            "status": "ingreso",
            "paymentStatus": "pendiente"
        },
        {
            "documentNumber": 17,
            "name": "Gabriela Jiménez",
            "distributor": "Distribuciones Centro",
            "date": "2024-06-30",
            "status": "ingreso",
            "paymentStatus": "pagado"
        },
        {
            "documentNumber": 18,
            "name": "Ricardo Montoya",
            "distributor": "Distribuidora Nacional",
            "date": "2024-04-30",
            "status": "ingreso",
            "paymentStatus": "pagado"
        },
        {
            "documentNumber": 19,
            "name": "Diana Pacheco Silva",
            "distributor": "Mayorista Express",
            "date": "2024-04-05",
            "status": "registrado",
            "paymentStatus": "pagado"
        },
        {
            "documentNumber": 20,
            "name": "Fernando Guzmán",
            "distributor": "Distribuidora Norte S.A.",
            "date": "2024-05-20",
            "status": "registrado",
            "paymentStatus": "pendiente"
        }
    ]
    
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
        data,
        assistants
    };
};

export default useDashboard;
