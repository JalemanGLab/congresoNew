import React, { useState } from "react";
import { format } from "@formkit/tempo";

/**
 * Hook personalizado para manejar la lógica de una tabla global
 * @param data - Datos a mostrar en la tabla
 * @param itemsPerPage - Número de elementos por página
 * @returns Objeto con estados y funciones para controlar la tabla
 */
const useTableGlobal = (data: any, itemsPerPage: number) => {
    // Estados para manejar la paginación y filtros
    const [currentPage, setCurrentPage] = useState(1);
    const [filterValue, setFilterValue] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);

    // Opciones de filtrado disponibles
    const filterOptions = [
        { id: 'all', label: 'Todos los campos', type: 'text' },
        { id: 'identification', label: 'Documento', type: 'text' },
        { id: 'created_at', label: 'Fecha', type: 'date' },
        { id: 'distributor', label: 'Distribuidor', type: 'text' },
        { 
            id: 'entry', 
            label: 'Estado de Ingreso', 
            type: 'select',
            options: [
                { value: 'null', label: 'Registrado' },
                { value: 'true', label: 'Ingresado' }
            ]
        },
    ];

    /**
     * Formatea una fecha en string al formato dd/mm/yyyy usando @formkit/tempo
     * @param dateString - Fecha en formato string
     * @returns Fecha formateada
     */
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            const colombiaDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
            return format(colombiaDate.toISOString(), { 
                date: 'short',
                time: 'short'
            }, 'es');
        } catch (error) {
            return '';
        }
    };

    // Filtrar los datos según el término de búsqueda y el filtro activo
    const filteredData = React.useMemo(() => {
        let results = [...data];

        if (filterValue) {
            const searchTerm = filterValue.toLowerCase();
            results = results.filter(item => {
                // Si el filtro es 'all', busca en todos los campos
                if (activeFilter === 'all') {
                    return Object.entries(item).some(([key, value]) => {
                        // Excluir el campo de fecha de la búsqueda de texto
                        if (key === 'created_at') return false;
                        return value?.toString().toLowerCase().includes(searchTerm);
                    });
                } 
                // Si es un filtro de fecha, compara las fechas
                else if (activeFilter === 'created_at') {
                    try {
                        const itemDate = new Date(item[activeFilter]);
                        // Ajustar la fecha de búsqueda para que sea a las 00:00 en Colombia
                        const searchDate = new Date(filterValue + 'T00:00:00');
                        
                        // Obtener las fechas en Colombia
                        const itemDateColombia = new Date(itemDate.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
                        const searchDateColombia = new Date(searchDate.toLocaleString('en-US', { timeZone: 'America/Bogota' }));

                        // Comparar solo año, mes y día
                        return itemDateColombia.getFullYear() === searchDateColombia.getFullYear() &&
                               itemDateColombia.getMonth() === searchDateColombia.getMonth() &&
                               itemDateColombia.getDate() === searchDateColombia.getDate();
                    } catch (error) {
                        return false;
                    }
                }
                // Si es un filtro de tipo select (estados)
                else if (activeFilter === 'entry') {
                    if (filterValue === 'null') {
                        return item[activeFilter] === null;
                    }
                    return item[activeFilter]?.toString() === filterValue;
                }
                else if (activeFilter === 'paymentStatus') {
                    return item[activeFilter]?.toLowerCase() === searchTerm.toLowerCase();
                }
                // Para otros filtros, busca en el campo específico
                else {
                    return item[activeFilter]?.toString().toLowerCase().includes(searchTerm);
                }
            });
        }

        return results;
    }, [filterValue, data, activeFilter]);

    // Cálculos de paginación
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    /**
     * Maneja el cambio en el valor del filtro
     * @param value - Nuevo valor del filtro
     */
    const handleFilterChange = (value: string) => {
        setFilterValue(value);
        setCurrentPage(1);
    };

    /**
     * Maneja el cambio en el tipo de filtro
     * @param filterId - ID del nuevo filtro seleccionado
     */
    const handleFilterTypeChange = (filterId: string) => {
        setActiveFilter(filterId);
        setShowFilterDropdown(false);
        setFilterValue('');
        setCurrentPage(1);
    };

    // Obtiene el tipo de filtro actual
    const currentFilterType = filterOptions.find(opt => opt.id === activeFilter)?.type || 'text';


    

    return {
        currentPage,
        filterValue,
        activeFilter,
        showFilterDropdown,
        filterOptions,
        currentFilterType,
        handleFilterChange,
        handleFilterTypeChange,
        formatDate,
        filteredData,
        totalPages,
        currentData,
        startIndex,
        endIndex,
        setCurrentPage,
        setFilterValue,
        setActiveFilter,
        setShowFilterDropdown,
    }
}

export default useTableGlobal;
