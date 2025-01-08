import { Table } from 'entities/Table'

export interface GetTablesRepositoryParams {
  where: {
    status: {
      equals: Table['status']
    }
  }
}

export interface GetTablesRepository {
  get(params: GetTablesRepositoryParams): Promise<Table[]>
}
