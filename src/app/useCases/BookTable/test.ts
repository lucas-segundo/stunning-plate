import { mockBooking } from 'entities/Booking/mock'
import { mockTable } from 'entities/Table/mock'
import { TableNotFreeError } from 'app/errors/TableNotFreeError'
import { mockBookTableUseCase } from './mock'

const makeMocks = () => {
  const {
    bookTableUseCase: sut,
    createBookingRepository,
    getTableRepository,
  } = mockBookTableUseCase()

  const table = mockTable()
  getTableRepository.get.mockResolvedValue(table)

  const booking = mockBooking()
  createBookingRepository.create.mockResolvedValue(booking)

  return { getTableRepository, table, createBookingRepository, booking, sut }
}

describe('BookTable', () => {
  it('should call get table repo with right params', async () => {
    const { sut, getTableRepository } = makeMocks()
    const booking = mockBooking()
    await sut.book(booking)

    expect(getTableRepository.get).toHaveBeenCalledWith(booking.tableID)
  })

  it('should call create booking if table is free', async () => {
    const { sut, createBookingRepository, booking } = makeMocks()
    await sut.book(booking)

    expect(createBookingRepository.create).toHaveBeenCalledWith({
      userID: booking.userID,
      tableID: booking.tableID,
      date: booking.date,
    })
  })

  it('should throw if table is not free', async () => {
    const { sut, getTableRepository, table, booking } = makeMocks()
    table.status = 'occupied'
    getTableRepository.get.mockResolvedValue(table)

    const promise = sut.book(booking)

    await expect(promise).rejects.toThrow(TableNotFreeError)
  })
})
