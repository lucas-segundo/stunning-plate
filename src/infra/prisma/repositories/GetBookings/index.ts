import {
  GetBookingsRepository,
  GetBookingsRepositoryParams,
} from 'app/repositories/GetBookings'
import { Booking } from 'entities/Booking'
import prisma from 'infra/prisma'
import { adaptBookingFromPrisma } from 'infra/prisma/adapters/adaptBooking'

export class PrismaGetBookingsRepository implements GetBookingsRepository {
  async get({ where }: GetBookingsRepositoryParams): Promise<Booking[]> {
    const { tableID } = where
    const prismaBookings = await prisma.booking.findMany({
      where: {
        tableID: {
          equals: Number(tableID?.equals),
        },
      },
    })

    return prismaBookings.map(adaptBookingFromPrisma)
  }
}
