import { makePrismaGetTablesRepository } from 'infra/prisma/repositories/GetTables/factory'
import { GetTablesController } from '.'
import { z } from 'zod'
import { ZodValidation } from 'infra/zod/Validation'

export const makeGetTablesController = (): GetTablesController => {
  const validationSchema = z.object({
    where: z.object({
      seats: z
        .object({
          equals: z.number().positive().optional(),
          greaterThanOrEqual: z.number().positive().optional(),
          lessThanOrEqual: z.number().positive().optional(),
        })
        .optional(),
    }),
  })

  return new GetTablesController(
    makePrismaGetTablesRepository(),
    new ZodValidation(validationSchema),
  )
}
