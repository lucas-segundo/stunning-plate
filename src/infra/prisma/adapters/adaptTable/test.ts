import { Table as PrismaTable } from '@prisma/client'
import { adaptTableFromPrisma } from '.'
import { Table } from 'entities/Table'
import { mockPrismaTable } from 'infra/prisma/models/Table/mock'

describe('adaptTableFromPrisma', () => {
  it('should adapt PrismaTable to Table correctly', () => {
    const prismaTable: PrismaTable = mockPrismaTable()

    const expectedTable: Table = {
      id: prismaTable.id.toString(),
      seats: prismaTable.seats,
    }

    const result = adaptTableFromPrisma(prismaTable)
    expect(result).toEqual(expectedTable)
  })
})
