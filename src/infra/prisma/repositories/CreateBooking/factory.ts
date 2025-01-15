import { PrismaCreateBookingRepository } from '.'

export const makePrismaCreateBookingRepository = () => {
  return new PrismaCreateBookingRepository()
}
