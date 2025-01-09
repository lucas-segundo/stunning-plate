import { Booking } from 'entities/Booking'
import { adaptBookingFromPrisma } from '.'
import { mockPrismaBooking } from 'infra/prisma/models/Booking/mock'

describe('adaptBookingFromPrisma', () => {
  it('should adapt PrismaUser to User correctly', () => {
    const prismaBooking = mockPrismaBooking()

    const expectedBooking: Booking = {
      id: prismaBooking.id.toString(),
      userID: prismaBooking.userID.toString(),
      tableID: prismaBooking.tableID.toString(),
      date: prismaBooking.date,
    }

    const result = adaptBookingFromPrisma(prismaBooking)
    expect(result).toEqual(expectedBooking)
  })
})
