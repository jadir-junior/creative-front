export interface Pagination<T> {
  data: T;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface Column {
  field: string;
  header: string;
}
