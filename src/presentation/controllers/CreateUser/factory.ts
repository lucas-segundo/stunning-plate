import { CreateUserController } from '.'
import { makePrismaCreateUserRepository } from 'infra/prisma/repositories/CreateUser/factory'

export const makeCreateUserController = (): CreateUserController => {
  return new CreateUserController(makePrismaCreateUserRepository())
}
