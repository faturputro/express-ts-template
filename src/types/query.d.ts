export type BaseQueryParams = {
  id?: number
  page?: string
  limit?: string
  sort?: string
  searchField?: string
  searchQuery?: string
  tab? : string
}

export type QueryParams<T extends Record<string, unknown>> = BaseQueryParams & T;

export type Paginated<T> = { rows: T[], count: number };
