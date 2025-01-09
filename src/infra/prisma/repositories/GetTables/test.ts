import { mockedPrismaClient } from 'infra/prisma/mock'
import { PrismaGetTablesRepository } from '.'
import { mockPrismaTable } from 'infra/prisma/models/Table/mock'
import { mockGetTablesRepositoryParams } from 'app/repositories/GetTables/mock'
import { adaptTableFromPrisma } from 'infra/prisma/adapters/adaptTable'

const makeMocks = () => {
  const sut = new PrismaGetTablesRepository()

  const prismaTableOne = mockPrismaTable()
  const prismaTableTwo = mockPrismaTable()
  const prismaTables = [prismaTableOne, prismaTableTwo]
  mockedPrismaClient.table.findMany.mockResolvedValue([
    prismaTableOne,
    prismaTableTwo,
  ])

  return { sut, prismaTableOne, prismaTableTwo, prismaTables }
}

describe('GetTables', () => {
  it('should call findMany with right params', async () => {
    const { sut } = makeMocks()
    const params = mockGetTablesRepositoryParams()
    await sut.get(params)

    expect(mockedPrismaClient.table.findMany).toHaveBeenCalledWith({
      where: {
        status: params.where?.status?.equals,
      },
    })
  })

  it('should return tables', async () => {
    const { sut, prismaTables } = makeMocks()

    const tables = await sut.get(mockGetTablesRepositoryParams())

    const adaptedTables = prismaTables.map((prismaTable) =>
      adaptTableFromPrisma(prismaTable),
    )
    expect(tables).toEqual(adaptedTables)
  })
})
