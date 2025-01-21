import { Table } from 'entities/Table'

export interface GetTablesRepositoryParams {
  where: {
    seats?: {
      equals?: number
      greaterThanOrEqual?: number
      lessThanOrEqual?: number
    }
  }
}

export interface GetTablesRepository {
  get(params: GetTablesRepositoryParams): Promise<Table[]>
}
