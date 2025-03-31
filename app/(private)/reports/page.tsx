"use client";
import { useEffect } from "react";
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
import { Loader2 } from "lucide-react";

export default function ReportsPage() {
  const { distributors, loading, generateExcel, getUniqueDistributors } = usePage();

  useEffect(() => {
    getUniqueDistributors();
  }, []);

  const handleDistributorSelect = (distributorName: string) => {
    generateExcel(distributorName);
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Generador de Reportes</CardTitle>
          <CardDescription>
            Selecciona un distribuidor para generar un reporte en Excel con los datos de sus asistentes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-4">
            <label className="text-sm font-medium">Distribuidor</label>
            <Select onValueChange={handleDistributorSelect} disabled={loading}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un distribuidor" />
              </SelectTrigger>
              <SelectContent>
                {distributors.map((distributor) => (
                  <SelectItem key={distributor.id} value={distributor.name}>
                    {distributor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading && (
            <div className="flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Generando reporte...</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
