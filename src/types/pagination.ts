export type Pagination<T> = {
  data: T[];
  toatal: number;
  page: number;
  limit: number;
  totalPages: number;
}