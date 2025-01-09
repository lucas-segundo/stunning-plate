import { Table as PrismaTable } from '@prisma/client'
import { Table } from 'entities/Table'

export const adaptTableFromPrisma = ({
  id,
  seats,
  status,
}: Pick<PrismaTable, 'id' | 'seats' | 'status'>): Table => {
  return {
    id: id.toString(),
    seats,
    status,
  }
}
