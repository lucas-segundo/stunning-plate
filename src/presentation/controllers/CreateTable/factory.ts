import { CreateTableController } from '.'
import { makePrismaCreateTableRepository } from 'infra/prisma/repositories/CreateTable/factory'
import { ZodValidation } from 'infra/zod/Validation'
import { makeCreateTableSchema } from 'infra/zod/schemas/CreateTable'

export const makeCreateTableController = (): CreateTableController => {
  const validation = new ZodValidation(makeCreateTableSchema())

  return new CreateTableController(
    makePrismaCreateTableRepository(),
    validation,
  )
}
