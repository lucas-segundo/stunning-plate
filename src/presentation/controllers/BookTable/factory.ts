import { makeBookTableUseCase } from 'app/useCases/BookTable/factory'
import { BookTableController } from '.'
import { ZodValidation } from 'infra/zod/Validation'
import { makeBookTableSchema } from 'infra/zod/schemas/BookTable'

export const makeBookTableController = (): BookTableController => {
  const validation = new ZodValidation(makeBookTableSchema())

  return new BookTableController(makeBookTableUseCase(), validation)
}
