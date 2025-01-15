import { mockGetTableRepository } from 'app/repositories/GetTable/mock'
import { BookTableDTO, BookTableUseCase } from '.'
import { mockCreateBookingRepository } from 'app/repositories/CreateBooking/mock'
import { faker } from '@faker-js/faker'

export const mockBookTableUseCaseDTO = (): BookTableDTO => ({
  userID: faker.string.uuid(),
  tableID: faker.string.uuid(),
  date: faker.date.recent(),
})

export const mockBookTableUseCase = () => {
  const getTableRepository = mockGetTableRepository()
  const createBookingRepository = mockCreateBookingRepository()

  const bookTableUseCase = new BookTableUseCase(
    getTableRepository,
    createBookingRepository,
  )

  return {
    getTableRepository,
    createBookingRepository,
    bookTableUseCase,
  }
}
