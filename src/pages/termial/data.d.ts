export interface TableTermialItem {
  key: number;
  name: string;
  eui: string;
  model: string;
  place: string;
  access: string;
  status: number;
}

export interface TableTermialPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableTermialDate {
  list: TableTermialItem[];
  pagination: Partial<TableTermialPagination>;
}

export interface TableTermialParams {
  sorter: string;
  status: string;
  name: string;
  eui: string;
  model: string;
  place: string;
  access: string;
  pageSize: number;
  currentPage: number;
}