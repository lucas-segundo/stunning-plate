import { mockedPrismaClient } from 'infra/prisma/mock'
import { PrismaGetTableRepository } from '.'
import { mockPrismaTable } from 'infra/prisma/models/Table/mock'
import { adaptTableFromPrisma } from 'infra/prisma/adapters/adaptTable'
import { NotFoundError } from 'app/errors/NotFoundError'

const makeMocks = () => {
  const sut = new PrismaGetTableRepository()

  const prismaTable = mockPrismaTable()
  mockedPrismaClient.table.findFirst.mockResolvedValue(prismaTable)

  return { sut, prismaTable }
}

describe('GetTable', () => {
  it('should call findFirst with right params', async () => {
    const { sut, prismaTable } = makeMocks()
    await sut.get(prismaTable.id.toString())

    expect(mockedPrismaClient.table.findFirst).toHaveBeenCalledWith({
      where: {
        id: prismaTable.id,
      },
    })
  })

  it('should return table', async () => {
    const { sut, prismaTable } = makeMocks()

    const tables = await sut.get(prismaTable.id.toString())

    const adaptedTable = adaptTableFromPrisma(prismaTable)
    expect(tables).toEqual(adaptedTable)
  })

  it('should throw if table is not found', async () => {
    const { sut } = makeMocks()
    mockedPrismaClient.table.findFirst.mockResolvedValue(null)

    const promise = sut.get('1')
    await expect(promise).rejects.toThrow(NotFoundError)
  })
})
