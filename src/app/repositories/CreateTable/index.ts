import { Table } from 'entities/Table'

export type CreateTableRepositoryParams = Omit<Table, 'id'>

export interface CreateTableRepository {
  create(params: CreateTableRepositoryParams): Promise<Table>
}
