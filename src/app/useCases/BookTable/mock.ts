import { BookTableDTO, BookTableUseCase } from '.'
import { mockCreateBookingRepository } from 'app/repositories/CreateBooking/mock'
import { faker } from '@faker-js/faker'
import { mockGetBookingsRepository } from 'app/repositories/GetBookings/mock'

export const mockBookTableUseCaseDTO = (): BookTableDTO => ({
  userID: faker.string.uuid(),
  tableID: faker.string.uuid(),
  date: faker.date.recent(),
})

export const mockBookTableUseCase = () => {
  const getBookingsRepository = mockGetBookingsRepository()
  const createBookingRepository = mockCreateBookingRepository()

  const bookTableUseCase = new BookTableUseCase(
    getBookingsRepository,
    createBookingRepository,
  )

  return {
    getBookingsRepository,
    createBookingRepository,
    bookTableUseCase,
  }
}
