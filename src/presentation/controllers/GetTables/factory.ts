import { makePrismaGetTablesRepository } from 'infra/prisma/repositories/GetTables/factory'
import { GetTablesController } from '.'
import { z } from 'zod'
import { ZodValidation } from 'infra/zod/Validation'

export const makeGetTablesController = (): GetTablesController => {
  const validationSchema = z.object({
    seats: z
      .object({
        equals: z.number({ coerce: true }).positive().optional(),
        greaterThanOrEqual: z.number({ coerce: true }).positive().optional(),
        lessThanOrEqual: z.number({ coerce: true }).positive().optional(),
      })
      .optional(),
  })

  return new GetTablesController(
    makePrismaGetTablesRepository(),
    new ZodValidation(validationSchema),
  )
}
