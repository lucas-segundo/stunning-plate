import { makePrismaGetTablesRepository } from 'infra/prisma/repositories/GetTables/factory'
import { GetTablesController } from '.'
import { ZodValidation } from 'infra/zod/Validation'
import { makeGetTablesSchema } from 'infra/zod/schemas/GetTables'

export const makeGetTablesController = (): GetTablesController => {
  const validation = new ZodValidation(makeGetTablesSchema())

  return new GetTablesController(makePrismaGetTablesRepository(), validation)
}
