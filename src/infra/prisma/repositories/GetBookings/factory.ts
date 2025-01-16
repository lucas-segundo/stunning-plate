import { PrismaGetBookingsRepository } from '.'

export const makePrismaGetBookingsRepository = () => {
  return new PrismaGetBookingsRepository()
}
