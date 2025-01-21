import { makePrismaGetTablesRepository } from 'infra/prisma/repositories/GetTables/factory'
import { GetTablesController } from '.'
import { z } from 'zod'
import { ZodValidation } from 'infra/zod/Validation'

export const makeGetTablesController = (): GetTablesController => {
  const validationSchema = z.object({
    where: z.object({
      seats: z
        .object({
          equals: z.number().optional(),
          greaterThanOrEqual: z.number().optional(),
          lessThanOrEqual: z.number().optional(),
        })
        .optional(),
    }),
  })

  return new GetTablesController(
    makePrismaGetTablesRepository(),
    new ZodValidation(validationSchema),
  )
}
