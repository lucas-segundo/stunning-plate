import { makeBookTableUseCase } from 'app/useCases/BookTable/factory'
import { BookTableController } from '.'

export const makeBookTableController = (): BookTableController => {
  return new BookTableController(makeBookTableUseCase())
}
