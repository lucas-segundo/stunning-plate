import { mockedPrismaClient } from 'infra/prisma/mock'
import { PrismaCreateUserRepository } from '.'
import { mockUser } from 'entities/User/mock'
import { mockPrismaUser } from 'infra/prisma/models/User/mock'
import { adaptUserFromPrisma } from 'infra/prisma/adapters/adaptUser'

const makeMocks = () => {
  const sut = new PrismaCreateUserRepository()

  const prismaUser = mockPrismaUser()
  mockedPrismaClient.user.create.mockResolvedValue(prismaUser)

  return { sut, prismaUser }
}

describe('CreateTable', () => {
  it('should create with right params', async () => {
    const { sut } = makeMocks()
    const table = mockUser()

    await sut.create(table)

    expect(mockedPrismaClient.user.create).toHaveBeenCalledWith({
      data: {
        name: table.name,
      },
      select: {
        id: true,
        name: true,
      },
    })
  })

  it('should return a user', async () => {
    const { sut, prismaUser } = makeMocks()

    const user = await sut.create(mockUser())

    const adaptedUser = adaptUserFromPrisma(prismaUser)
    expect(user).toEqual(adaptedUser)
  })
})
