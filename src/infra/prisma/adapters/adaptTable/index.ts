import { Table as PrismaTable } from '@prisma/client'
import { Table } from 'entities/Table'

export const adaptTableFromPrisma = ({
  id,
  seats,
}: Pick<PrismaTable, 'id' | 'seats'>): Table => {
  return {
    id: id.toString(),
    seats,
  }
}
