import { CreateUserController } from '.'
import { makePrismaCreateUserRepository } from 'infra/prisma/repositories/CreateUser/factory'
import { ZodValidation } from 'infra/zod/Validation'
import { makeCreateUserSchema } from 'infra/zod/schemas/CreateUser'

export const makeCreateUserController = (): CreateUserController => {
  const validation = new ZodValidation(makeCreateUserSchema())

  return new CreateUserController(makePrismaCreateUserRepository(), validation)
}
