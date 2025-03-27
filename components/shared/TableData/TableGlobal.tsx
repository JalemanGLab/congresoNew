"use client"

import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IoIosSearch, IoMdClose, IoIosArrowDown } from "react-icons/io";
import useTableGlobal from './useTableGlobal';
import { TableGlobalProps } from './DTOTableGlobal';
import { useEffect, useRef } from 'react';

/**
 * Componente de tabla global reutilizable con funcionalidades de filtrado y paginación
 * @param columns - Array de columnas que define la estructura de la tabla
 * @param data - Datos a mostrar en la tabla
 * @param itemsPerPage - Número de elementos por página (por defecto 4)
 * @param filters - Configuración de filtros
 * @param emptyMessage - Mensaje a mostrar cuando no hay datos (por defecto 'No hay datos disponibles')
 */
const TableGlobal = ({
  columns,
  data,
  itemsPerPage = 4,
  filters,
  emptyMessage = 'No hay datos disponibles',
}: TableGlobalProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
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
    setShowFilterDropdown,
  } = useTableGlobal(data, itemsPerPage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowFilterDropdown]);
  
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Filtros y Búsqueda */}
      {filters?.all && (
        <div className="w-full max-w-[900px] bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1" ref={dropdownRef}>
              <div className="flex">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center justify-between px-4 py-2 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md min-w-[180px] text-sm text-gray-700"
                >
                  <span>{filterOptions.find(opt => opt.id === activeFilter)?.label}</span>
                  <IoIosArrowDown className="ml-2" />
                </button>
                <div className="relative flex-1">
                  {currentFilterType === 'text' ? (
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <IoIosSearch className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder={`Buscar  por ${filterOptions.find(opt => opt.id === activeFilter)?.label.toLowerCase()}`}
                        className="w-full h-10 text-neutral-800 bg-neutral-50 border border-l-0 border-gray-300 pl-10 pr-4 rounded-r-md outline-none text-sm"
                        value={filterValue}
                        onChange={(e) => handleFilterChange(e.target.value)}
                      />
                    </div>
                  ) : currentFilterType === 'date' ? (
                    <div className="relative flex-1">
                      <input
                        type="date"
                        className="w-full h-10 border text-neutral-800 bg-neutral-50 border-l-0 border-gray-300 px-4 rounded-r-md outline-none text-sm appearance-none"
                        value={filterValue}
                        onChange={(e) => {
                          // Ajustar la fecha seleccionada para que sea a las 00:00 en Colombia
                          const selectedDate = new Date(e.target.value + 'T00:00:00');
                          const year = selectedDate.getFullYear();
                          const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                          const day = String(selectedDate.getDate()).padStart(2, '0');
                          handleFilterChange(`${year}-${month}-${day}`);
                        }}
                        max="2100-12-31"
                        style={{ colorScheme: 'light' }}
                      />
                      {filterValue && (
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-xs text-gray-500 pointer-events-none bg-white px-1">
                          {formatDate(filterValue + 'T00:00:00')}
                        </div>
                      )}
                    </div>
                  ) : currentFilterType === 'select' ? (
                    <div className="relative flex-1">
                      <select
                        className="w-full h-10 border text-neutral-800 bg-neutral-50 border-l-0 border-gray-300 px-4 rounded-r-md outline-none text-sm appearance-none"
                        value={filterValue}
                        onChange={(e) => handleFilterChange(e.target.value)}
                      >
                        <option value="">Seleccionar opción</option>
                        {filterOptions
                          .find(opt => opt.id === activeFilter)
                          ?.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <IoIosArrowDown className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {showFilterDropdown && (
                <div className="absolute z-50 mt-1 w-[180px] bg-white border border-gray-200 rounded-md shadow-lg">
                  {filterOptions.map((option) => (
                    <button
                      key={option.id}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => handleFilterTypeChange(option.id)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {filterValue && (
              <button
                onClick={() => {
                  handleFilterChange('');
                  handleFilterTypeChange('all');
                }}
                className="h-10 cursor-pointer px-4 bg-neutral-800 text-neutral-50 rounded-md flex items-center justify-center gap-2 hover:bg-neutral-900 transition-all duration-300 whitespace-nowrap"
              >
                <span>Limpiar</span>
                <IoMdClose className="text-xl" />
              </button>
            )}
          </div>
        </div>
      )}

      <div className="w-full">
        <div className="overflow-x-auto border border-gray-200 rounded-t-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Encabezados */}
            <thead className="bg-neutral-100">
              <tr>
                {columns.map((column, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider whitespace-nowrap"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Cuerpo */}
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.length > 0 ? (
                currentData.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-gray-50">
                    {columns.map((column, colIdx) => (
                      <td
                        key={colIdx}
                        className="px-4 py-4 text-sm text-neutral-600 whitespace-nowrap"
                      >
                        {column.cell ? column.cell(row) : row[column.accessor]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-3 text-center text-sm text-neutral-600"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginador */}
        {data.length > 0 && (
          <div className="w-full flex flex-col sm:flex-row sm:justify-between items-center gap-3 px-4 py-3 border border-gray-200 rounded-b-lg bg-white">
            <div className="text-xs sm:text-sm text-gray-700">
              Mostrando{' '}
              <span className="font-medium">{startIndex + 1}</span>
              {' '}a{' '}
              <span className="font-medium">
                {Math.min(endIndex, filteredData.length)}
              </span>
              {' '}de{' '}
              <span className="font-medium">{filteredData.length}</span>
              {' '}resultados
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-1 sm:p-1.5 rounded-md ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'cursor-pointer bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <BiChevronLeft className="text-lg sm:text-xl" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-md text-sm ${
                        currentPage === pageNumber
                          ? 'bg-neutral-800 text-white'
                          : 'cursor-pointer bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-1 sm:p-2 rounded-md ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'cursor-pointer bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <BiChevronRight className="text-lg sm:text-xl" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableGlobal;