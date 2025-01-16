import { mockBooking } from 'entities/Booking/mock'
import { TableNotFreeError } from 'app/errors/TableNotFreeError'
import { mockBookTableUseCase } from './mock'

const makeMocks = () => {
  const {
    bookTableUseCase: sut,
    createBookingRepository,
    getBookingsRepository,
  } = mockBookTableUseCase()

  getBookingsRepository.get.mockResolvedValue([])

  return {
    getBookingsRepository,
    createBookingRepository,
    sut,
  }
}

describe('BookTable', () => {
  it('should call get bookings repo with right params', async () => {
    const { sut, getBookingsRepository } = makeMocks()
    const booking = mockBooking()
    await sut.book(booking)

    expect(getBookingsRepository.get).toHaveBeenCalledWith({
      where: {
        tableID: {
          equals: booking.tableID,
        },
      },
    })
  })

  it('should call create booking if bookings is free', async () => {
    const { sut, createBookingRepository } = makeMocks()
    const booking = mockBooking()
    await sut.book(booking)

    expect(createBookingRepository.create).toHaveBeenCalledWith({
      userID: booking.userID,
      tableID: booking.tableID,
      date: booking.date,
    })
  })

  it('should throw if bookings is not free', async () => {
    const { sut, getBookingsRepository } = makeMocks()
    const bookings = [mockBooking()]
    getBookingsRepository.get.mockResolvedValue(bookings)

    const promise = sut.book(mockBooking())

    await expect(promise).rejects.toThrow(TableNotFreeError)
  })
})
