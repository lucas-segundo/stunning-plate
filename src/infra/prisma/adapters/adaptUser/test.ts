import { User as PrismaUser } from '@prisma/client'
import { adaptUserFromPrisma } from '.'
import { User } from 'entities/User'
import { mockPrismaUser } from 'infra/prisma/models/User/mock'

describe('adaptUserFromPrisma', () => {
  it('should adapt PrismaUser to User correctly', () => {
    const prismaUser: PrismaUser = mockPrismaUser()

    const expectedUser: User = {
      id: prismaUser.id.toString(),
      name: prismaUser.name,
    }

    const result = adaptUserFromPrisma(prismaUser)
    expect(result).toEqual(expectedUser)
  })
})
