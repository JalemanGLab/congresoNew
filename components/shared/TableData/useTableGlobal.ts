import React, { useState } from "react";

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
        { id: 'documentNumber', label: 'Documento', type: 'text' },
        { id: 'status', label: 'Estado', type: 'text' },
        { id: 'date', label: 'Fecha', type: 'date' },
        { id: 'distributor', label: 'Distribuidor', type: 'text' },
        { id: 'paymentStatus', label: 'Estado de Pago', type: 'text' },
    ];

    /**
     * Formatea una fecha en string al formato dd/mm/yyyy
     * @param dateString - Fecha en formato string
     * @returns Fecha formateada
     */
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            const userTimezoneOffset = date.getTimezoneOffset() * 60000;
            const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
            
            const day = String(adjustedDate.getDate()).padStart(2, '0');
            const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
            const year = adjustedDate.getFullYear();
            
            return `${day}/${month}/${year}`;
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
                    return Object.values(item).some(value => 
                        value?.toString().toLowerCase().includes(searchTerm)
                    );
                } 
                // Si es un filtro de fecha, compara las fechas
                else if (activeFilter === 'date') {
                    try {
                        const itemDateStr = item[activeFilter];
                        const itemDate = itemDateStr.split('T')[0];
                        return itemDate === filterValue;
                    } catch (error) {
                        return false;
                    }
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
