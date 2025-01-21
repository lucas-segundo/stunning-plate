import { z } from 'zod'
import { CreateUserController } from '.'
import { makePrismaCreateUserRepository } from 'infra/prisma/repositories/CreateUser/factory'
import { ZodValidation } from 'infra/zod/Validation'

export const makeCreateUserController = (): CreateUserController => {
  const validationSchema = z.object({
    name: z.string().min(3),
  })

  return new CreateUserController(
    makePrismaCreateUserRepository(),
    new ZodValidation(validationSchema),
  )
}
