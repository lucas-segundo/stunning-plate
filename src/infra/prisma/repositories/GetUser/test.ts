import { mockedPrismaClient } from 'infra/prisma/mock'
import { PrismaGetUserRepository } from '.'
import { mockPrismaUser } from 'infra/prisma/models/User/mock'
import { adaptUserFromPrisma } from 'infra/prisma/adapters/adaptUser'
import { faker } from '@faker-js/faker/.'
import { NotFoundError } from 'app/errors/NotFoundError'

const makeMocks = () => {
  const sut = new PrismaGetUserRepository()

  const prismaUser = mockPrismaUser()
  mockedPrismaClient.user.findFirst.mockResolvedValue(prismaUser)

  return { sut, prismaUser }
}

describe('GetUser', () => {
  it('should create with right params', async () => {
    const { sut } = makeMocks()
    const id = faker.number.int().toString()
    await sut.get(id)

    expect(mockedPrismaClient.user.findFirst).toHaveBeenCalledWith({
      where: {
        id: {
          equals: Number(id),
        },
      },
      select: {
        id: true,
        name: true,
      },
    })
  })

  it('should return a user', async () => {
    const { sut, prismaUser } = makeMocks()
    const id = faker.number.int().toString()
    const user = await sut.get(id)

    const adaptedUser = adaptUserFromPrisma(prismaUser)
    expect(user).toEqual(adaptedUser)
  })

  it('should throw if user is not found', async () => {
    const { sut } = makeMocks()
    mockedPrismaClient.user.findFirst.mockResolvedValue(null)

    const id = faker.number.int().toString()
    await expect(sut.get(id)).rejects.toThrow(NotFoundError)
  })
})
