"use client";
import {
  IdentificationCell,
  FullNameCell,
  DistributorCell,
  RegistrationDateCell,
  PaymentStatusCell,
  EntryStatusCell,
  PaymentRefCell,
} from "@/components/pages/dashboard/templates/cellTemplates";
import { getAssistants } from "@/services/asisstantService";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import Chart from 'chart.js/auto';

const useDashboard = () => {
  const [assistants, setAssistants] = useState<any>([]);
  const [mainCity, setMainCity] = useState({ city: "Ninguna", count: 0 });
  const [distributorData, setDistributorData] = useState<{
    labels: string[];
    data: number[];
  }>({ labels: [], data: [] });
  const { isAuthenticated, token, user } = useAuthStore();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<"bar", number[], string> | null>(null);

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

  useEffect(() => {
    if (assistants.length > 0) {
      calculateMainCity();
      calculateDistributorData();
    }
  }, [assistants]);

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
      header: "Referencia de Pago",
      accessor: "payment_ref",
      cell: PaymentRefCell,
    },
    {
      header: "Acciones",
      accessor: "actions",
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

  const calculateMainCity = () => {
    const cityCounts: Record<string, number> = {};
    assistants.forEach((assistant: any) => {
      const city = assistant.city || "No especificada";
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });
    
    let topCity = "Ninguna";
    let maxCount = 0;
    
    Object.entries(cityCounts).forEach(([city, count]) => {
      if (count > maxCount) {
        topCity = city;
        maxCount = count;
      }
    });
    
    setMainCity({ city: topCity, count: maxCount });
  };

  const calculateDistributorData = () => {
    // Contar asistentes por distribuidor
    const distributorCounts: Record<string, number> = {};
    assistants.forEach((assistant: any) => {
      const distributor = assistant.distributor || "No especificado";
      distributorCounts[distributor] = (distributorCounts[distributor] || 0) + 1;
    });

    // Mapeo de nombres para mostrar etiquetas legibles
    const distributorLabels: Record<string, string> = {
      dental_83: "Dental 83",
      dental_nader: "Dental Nader",
      dentales_market: "Dentales Market",
      casa_dental: "Casa Dental",
      orbidental: "Orbidental",
      bracket: "Bracket",
      adental: "Adental"
    };

    // Preparar datos para el gráfico
    const labels = Object.keys(distributorCounts).map(key => 
      distributorLabels[key] || key.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    );
    
    const data = Object.values(distributorCounts);
    
    setDistributorData({ labels, data });
  };

  const initializeChart = (ctx: CanvasRenderingContext2D) => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Colores para las barras
    const backgroundColors = [
      'rgba(75, 192, 192, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)',
      'rgba(255, 99, 132, 0.6)',
      'rgba(255, 206, 86, 0.6)',
    ];
    
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: distributorData.labels,
        datasets: [{
          label: 'Asistentes por Distribuidor',
          data: distributorData.data,
          backgroundColor: backgroundColors.slice(0, distributorData.labels.length),
          borderColor: backgroundColors.map(color => color.replace('0.6', '1')),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: function(tooltipItems) {
                return tooltipItems[0].label;
              },
              label: function(context) {
                return `Asistentes: ${context.raw}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  };

  return {
    columns,
    assistants,
    mainCity,
    distributorData,
    chartRef,
    chartInstance,
    initializeChart
  };
};

export default useDashboard;
