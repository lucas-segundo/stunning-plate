import { BookTableUseCase } from '.'
import { makePrismaCreateBookingRepository } from 'infra/prisma/repositories/CreateBooking/factory'
import { makePrismaGetTableRepository } from 'infra/prisma/repositories/GetTable/factory'

export const makeBookTableUseCase = () => {
  const getTableRepository = makePrismaGetTableRepository()
  const createBookingRepository = makePrismaCreateBookingRepository()

  return new BookTableUseCase(getTableRepository, createBookingRepository)
}
