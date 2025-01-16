import { BookTableUseCase } from '.'
import { makePrismaCreateBookingRepository } from 'infra/prisma/repositories/CreateBooking/factory'
import { makePrismaGetBookingsRepository } from 'infra/prisma/repositories/GetBookings/factory'

export const makeBookTableUseCase = () => {
  const getBookingsRepository = makePrismaGetBookingsRepository()
  const createBookingRepository = makePrismaCreateBookingRepository()

  return new BookTableUseCase(getBookingsRepository, createBookingRepository)
}
