import { NotFoundError } from 'app/errors/NotFoundError'
import { GetUserRepository } from 'app/repositories/GetUser'
import { User } from 'entities/User'
import prisma from 'infra/prisma'
import { adaptUserFromPrisma } from 'infra/prisma/adapters/adaptUser'

export class PrismaGetUserRepository implements GetUserRepository {
  async get(id: string): Promise<User> {
    const user = await prisma.user.findFirst({
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

    if (user) {
      return adaptUserFromPrisma(user)
    } else {
      throw new NotFoundError('User not found')
    }
  }
}
