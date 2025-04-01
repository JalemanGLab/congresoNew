"use client";

import useDashboard from "./useDashboard";
import TableGlobal from "@/components/shared/TableData/TableGlobal";
import { FiUsers, FiShoppingBag, FiMapPin } from "react-icons/fi";
import { useEffect } from "react";

const PageDashboard = () => {
  const { 
    columns, 
    assistants, 
    mainCity, 
    distributorData, 
    chartRef, 
    initializeChart,
    getAssistantsData 
  } = useDashboard();
  
  useEffect(() => {
    if (chartRef.current && distributorData.labels.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        initializeChart(ctx);
      }
    }
  }, [distributorData, chartRef, initializeChart]);

  return (
    <div className="w-full flex flex-col gap-4 p-3">
      {/* Contenedor de tarjetas con responsive mejorado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {/* Card 1: Total de Asistentes */}
        <div className="w-full bg-white shadow-sm border border-gray-100 rounded-lg p-5 flex flex-col justify-between min-h-[180px]">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 text-lg">Asistentes Totales</h3>
            <div className="p-2 bg-blue-100 rounded-full">
              <FiUsers className="text-blue-600 text-xl" />
            </div>
          </div>
          <div className="text-4xl font-bold text-gray-800 my-4">{assistants.length}</div>
          <div className="text-sm text-gray-500 bg-blue-50 p-2 rounded-md inline-block">
            <span className="text-blue-600 font-medium">
              Total registrado
            </span>
          </div>
        </div>
        
        {/* Card 3: Ciudad Principal - Movida a la segunda posición en móvil */}
        <div className="w-full bg-white shadow-sm border border-gray-100 rounded-lg p-5 flex flex-col justify-between min-h-[180px]">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 text-lg">Ciudad Principal</h3>
            <div className="p-2 bg-orange-100 rounded-full">
              <FiMapPin className="text-orange-600 text-xl" />
            </div>
          </div>
          <div className="text-4xl font-bold text-gray-800 my-4 capitalize">
            {mainCity.city}
          </div>
          <div className="text-sm text-gray-500 bg-orange-50 p-2 rounded-md inline-block">
            <span className="text-orange-600 font-medium">
              {mainCity.count} asistentes
            </span>
          </div>
        </div>
        
        {/* Card 2: Distribuidores (Gráfico) - Ocupa todo el ancho en lg */}
        <div className="w-full bg-white shadow-sm border border-gray-100 rounded-lg p-5 flex flex-col md:col-span-2 lg:col-span-1 min-h-[180px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 text-lg">Distribuidores</h3>
            <div className="p-2 bg-purple-100 rounded-full">
              <FiShoppingBag className="text-purple-600 text-xl" />
            </div>
          </div>
          <div className="flex-grow relative min-h-[170px]">
            <canvas ref={chartRef} />
          </div>
        </div>
      </div> 
      
      {/* Tabla de datos */}
      <div className="w-full">
        <TableGlobal
          columns={columns}
          data={assistants}
          itemsPerPage={5}
          filters={{
            all: true,
          }}
          refresh={{
            show: true,
            onRefresh: getAssistantsData,
          }}
        />
      </div>
    </div>
  );
};

export default PageDashboard;