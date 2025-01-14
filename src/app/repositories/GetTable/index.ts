import { Table } from 'entities/Table'

export interface GetTableRepository {
  get(id: string): Promise<Table>
}
