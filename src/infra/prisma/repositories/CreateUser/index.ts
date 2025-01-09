import {
  CreateUserRepository,
  CreateUserRepositoryParams,
} from 'app/repositories/CreateUser'
import { User } from 'entities/User'
import prisma from 'infra/prisma'
import { adaptUserFromPrisma } from 'infra/prisma/adapters/adaptUser'

export class PrismaCreateUserRepository implements CreateUserRepository {
  async create({ name }: CreateUserRepositoryParams): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    })

    return adaptUserFromPrisma(user)
  }
}
