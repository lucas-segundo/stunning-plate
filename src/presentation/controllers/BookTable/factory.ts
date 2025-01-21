import { makeBookTableUseCase } from 'app/useCases/BookTable/factory'
import { BookTableController } from '.'
import { z } from 'zod'
import { ZodValidation } from 'infra/zod/Validation'

export const makeBookTableController = (): BookTableController => {
  const validationSchema = z.object({
    userID: z.string(),
    tableID: z.string(),
    date: z.string().datetime(),
  })

  return new BookTableController(
    makeBookTableUseCase(),
    new ZodValidation(validationSchema),
  )
}
