import { mockedPrismaClient } from 'infra/prisma/mock'
import { PrismaGetBookingsRepository } from '.'
import { mockPrismaBooking } from 'infra/prisma/models/Booking/mock'
import { mockGetBookingsRepositoryParams } from 'app/repositories/GetBookings/mock'
import { adaptBookingFromPrisma } from 'infra/prisma/adapters/adaptBooking'

const makeMocks = () => {
  const sut = new PrismaGetBookingsRepository()

  const prismaBookingOne = mockPrismaBooking()
  const prismaBookingTwo = mockPrismaBooking()
  const prismaBookings = [prismaBookingOne, prismaBookingTwo]
  mockedPrismaClient.booking.findMany.mockResolvedValue([
    prismaBookingOne,
    prismaBookingTwo,
  ])

  return { sut, prismaBookingOne, prismaBookingTwo, prismaBookings }
}

describe('GetBookings', () => {
  it('should call findMany with right params', async () => {
    const { sut } = makeMocks()
    const params = mockGetBookingsRepositoryParams()
    await sut.get(params)

    expect(mockedPrismaClient.table.findMany).toHaveBeenCalledWith({
      where: {
        tableID: {
          equals: params.where?.tableID?.equals,
        },
      },
    })
  })

  it('should return tables', async () => {
    const { sut, prismaBookings } = makeMocks()

    const tables = await sut.get(mockGetBookingsRepositoryParams())

    const adaptedBookings = prismaBookings.map(adaptBookingFromPrisma)
    expect(tables).toEqual(adaptedBookings)
  })
})
