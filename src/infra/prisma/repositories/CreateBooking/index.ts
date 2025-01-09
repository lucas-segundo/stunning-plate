import {
  CreateBookingRepository,
  CreateBookingRepositoryParams,
} from 'app/repositories/CreateBooking'
import { Booking } from 'entities/Booking'
import prisma from 'infra/prisma'
import { adaptBookingFromPrisma } from 'infra/prisma/adapters/adaptBooking'

export class PrismaCreateBookingRepository implements CreateBookingRepository {
  async create({
    userID,
    tableID,
    date,
  }: CreateBookingRepositoryParams): Promise<Booking> {
    const table = await prisma.booking.create({
      data: {
        userID: Number(userID),
        tableID: Number(tableID),
        date,
      },
      select: {
        id: true,
        userID: true,
        tableID: true,
        date: true,
      },
    })

    return adaptBookingFromPrisma(table)
  }
}
