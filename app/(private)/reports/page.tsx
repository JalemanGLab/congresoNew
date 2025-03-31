"use client";
import { useEffect, useState } from "react";
import usePage from "./usePage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Download } from "lucide-react";

export default function ReportsPage() {
  const { distributors, loading, generateExcel, getUniqueDistributors } =
    usePage();
  const [selectedDistributor, setSelectedDistributor] = useState<string>("");

  useEffect(() => {
    getUniqueDistributors();
  }, []);

  const handleDistributorSelect = (distributorName: string) => {
    setSelectedDistributor(distributorName);
  };

  return (
    <div className="container  mx-auto p-6 flex items-center justify-center">
      <Card className="max-w-2xl bg-[#dcdcdc] mx-auto shadow-lg border-2 border-indigo-100">
        <CardHeader className="bg-gradient-to-r  text-[#4c4c4c] rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-[#4c4c4c] ">
            Generador de Reportes
          </CardTitle>
          <CardDescription className="text-[#4c4c4c]">
            Selecciona un distribuidor para generar un reporte en Excel con los
            datos de sus asistentes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#4c4c4c]">
                Distribuidor
              </label>
              <Select
                onValueChange={handleDistributorSelect}
                disabled={loading}
              >
                <SelectTrigger className="w-full bg-[#4c4c4c] text-white">
                  <SelectValue placeholder="Selecciona un distribuidor" />
                </SelectTrigger>
                <SelectContent>
                  {distributors.map((distributor) => (
                    <SelectItem
                      key={distributor.id}
                      value={distributor.name}
                      className="hover:bg-indigo-50"
                    >
                      {distributor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={() => generateExcel(selectedDistributor)}
              disabled={!selectedDistributor || loading}
              className="w-full text-white transition-colors"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              {loading ? "Generando reporte..." : "Descargar Excel"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
