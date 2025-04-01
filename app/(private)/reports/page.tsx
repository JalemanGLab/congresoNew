"use client";
import { useEffect, useState } from "react";
import usePage from "./usePage";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Download, FileSpreadsheet } from "lucide-react";

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
    <div className="min-h-[80vh] w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[90%] sm:max-w-[600px] border-0 shadow-lg overflow-hidden bg-white rounded-lg">
        {/* Header */}
        <div className="bg-white py-4 px-4 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-100 text-emerald-600">
              <FileSpreadsheet className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Generador de Reportes</h2>
            </div>
          </div>
          <p className="text-slate-600 text-sm sm:text-base">
            Selecciona un distribuidor para generar un reporte en Excel con los datos de sus asistentes
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-2 bg-white">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
              Distribuidor
              <span className="text-red-500">*</span>
            </label>
            <Select onValueChange={handleDistributorSelect} disabled={loading}>
              <SelectTrigger className="w-full bg-white border border-slate-200 text-slate-800 h-11 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                <SelectValue placeholder="Selecciona un distribuidor" />
              </SelectTrigger>
              <SelectContent>
                {distributors.map((distributor) => (
                  <SelectItem key={distributor.id} value={distributor.name} className="hover:bg-emerald-50">
                    {distributor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 bg-white">
          <button
            onClick={() => generateExcel(selectedDistributor)}
            disabled={!selectedDistributor || loading}
            className={`w-full h-10 sm:h-11 text-sm sm:text-base rounded-md bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center`}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span>Generando reporte...</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                <span>Descargar Excel</span>
              </>
            )}
          </button>
          {!selectedDistributor && (
            <p className="text-xs text-slate-500 mt-2 text-center">
              Selecciona un distribuidor para activar la descarga
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
