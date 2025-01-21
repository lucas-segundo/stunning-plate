import { CreateTableController } from '.'
import { makePrismaCreateTableRepository } from 'infra/prisma/repositories/CreateTable/factory'
import { z } from 'zod'
import { ZodValidation } from 'infra/zod/Validation'

export const makeCreateTableController = (): CreateTableController => {
  const validationSchema = z.object({
    seats: z.number().positive(),
  })

  return new CreateTableController(
    makePrismaCreateTableRepository(),
    new ZodValidation(validationSchema),
  )
}
