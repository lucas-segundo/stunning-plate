import { mockTable } from 'entities/Table/mock'
import { PrismaCreateTableRepository } from '.'
import { mockedPrismaClient } from 'infra/prisma/mock'
import { mockPrismaTable } from 'infra/prisma/models/Table/mock'
import { adaptTableFromPrisma } from 'infra/prisma/adapters/adaptTable'

const makeMocks = () => {
  const sut = new PrismaCreateTableRepository()

  const prismaTable = mockPrismaTable()
  mockedPrismaClient.table.create.mockResolvedValue(prismaTable)

  return { sut, prismaTable }
}

describe('CreateTable', () => {
  it('should create with right params', async () => {
    const { sut } = makeMocks()
    const table = mockTable()

    await sut.create(table)

    expect(mockedPrismaClient.table.create).toHaveBeenCalledWith({
      data: {
        seats: table.seats,
        status: table.status,
      },
      select: {
        id: true,
        seats: true,
        status: true,
      },
    })
  })

  it('should return a table', async () => {
    const { sut, prismaTable } = makeMocks()

    const table = await sut.create(mockTable())
    const adaptedTable = adaptTableFromPrisma(prismaTable)

    expect(table).toEqual(adaptedTable)
  })
})
