import { useState } from "react";
import { getAssistants } from "@/services/asisstantService";
import { toast } from "sonner";
import * as XLSX from "xlsx";

interface Distributor {
  id: string;
  name: string;
}

interface Assistant {
  identification: string;
  first_name: string;
  distributor: string;
  payment_status: string;
  status: string;
}

function usePage() {
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [loading, setLoading] = useState(false);

  const generateExcel = async (distributorName: string) => {
    try {
      setLoading(true);
      const response = await getAssistants();

      // Filtrar asistentes por distribuidor
      const filteredAssistants = response.data.filter(
        (assistant: Assistant) => assistant.distributor === distributorName
      );

      // Preparar datos para Excel
      const excelData = filteredAssistants.map((assistant: Assistant) => ({
        "Número de Documento": assistant.identification,
        "Nombre Completo": assistant.first_name,
        Distribuidor: assistant.distributor,
        "Estado de Pago": assistant.payment_status,
      }));

      // Crear workbook y worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(excelData);

      // Añadir worksheet al workbook
      XLSX.utils.book_append_sheet(wb, ws, "Reporte");

      // Generar archivo
      const fileName = `reporte_${distributorName}_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      XLSX.writeFile(wb, fileName);

      toast.success("Reporte generado exitosamente");
    } catch (error) {
      toast.error("Error al generar el reporte");
    } finally {
      setLoading(false);
    }
  };

  const getUniqueDistributors = async () => {
    try {
      const response = await getAssistants();
      const uniqueDistributors = Array.from(
        new Set(
          response.data.map((assistant: Assistant) => assistant.distributor)
        )
      ).map((name) => ({
        id: name as string,
        name: name as string,
      }));
      setDistributors(uniqueDistributors);
    } catch (error) {
      toast.error("Error al obtener distribuidores");
    }
  };

  return {
    distributors,
    loading,
    generateExcel,
    getUniqueDistributors,
  };
}

export default usePage;
