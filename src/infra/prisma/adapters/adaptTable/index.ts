import { Table as PrismaTable } from '@prisma/client'
import { Table } from 'entities/Table'

export const adaptTableFromPrisma = ({
  id,
  seats,
  status,
}: PrismaTable): Table => {
  return {
    id: id.toString(),
    seats,
    status,
  }
}
