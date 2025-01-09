import { Table as PrismaTable } from '@prisma/client'
import { Table } from 'entities/Table'

export const adaptTableFromPrisma = (prismaTable: PrismaTable): Table => {
  return {
    ...prismaTable,
    id: prismaTable.id.toString(),
  }
}
