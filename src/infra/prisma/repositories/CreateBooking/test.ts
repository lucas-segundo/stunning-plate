import { mockedPrismaClient } from 'infra/prisma/mock'
import { PrismaCreateBookingRepository } from '.'
import { mockPrismaBooking } from 'infra/prisma/models/Booking/mock'
import { mockBooking } from 'entities/Booking/mock'
import { adaptBookingFromPrisma } from 'infra/prisma/adapters/adaptBooking'

const makeMocks = () => {
  const sut = new PrismaCreateBookingRepository()

  const prismaBooking = mockPrismaBooking()
  mockedPrismaClient.booking.create.mockResolvedValue(prismaBooking)

  return { sut, prismaBooking }
}

describe('CreateBooking', () => {
  it('should create with right params', async () => {
    const { sut, prismaBooking } = makeMocks()
    const booking = mockBooking()

    await sut.create(booking)

    expect(mockedPrismaClient.table.create).toHaveBeenCalledWith({
      data: {
        userID: Number(prismaBooking.userID),
        tableID: Number(prismaBooking.tableID),
        date: prismaBooking.date,
      },
      select: {
        id: true,
        userID: true,
        tableID: true,
        date: true,
      },
    })
  })

  it('should return a booking', async () => {
    const { sut, prismaBooking } = makeMocks()

    const booking = await sut.create(mockBooking())
    const adaptedBooking = adaptBookingFromPrisma(prismaBooking)

    expect(booking).toEqual(adaptedBooking)
  })
})
