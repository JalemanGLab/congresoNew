interface Column {
    header: string;
    accessor: string;
    cell?: (row: any) => React.ReactNode;
  }
  
export interface TableGlobalProps {
    columns: Column[];
    data: any[];
    itemsPerPage?: number;
  
    filters?: {
      name?: boolean;
      status?: boolean;
      date?: boolean;
      cedula?: boolean;
      all?: boolean;
    };
  
    isLoading?: boolean;
    emptyMessage?: string;
  }