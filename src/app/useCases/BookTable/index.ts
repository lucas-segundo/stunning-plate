import { TableNotFreeError } from 'app/errors/TableNotFreeError'
import { CreateBookingRepository } from 'app/repositories/CreateBooking'
import { GetBookingsRepository } from 'app/repositories/GetBookings'
import { Booking } from 'entities/Booking'

export interface BookTableDTO {
  userID: string
  tableID: string
  date: Date
}

export class BookTableUseCase {
  constructor(
    private readonly getBookingsRepository: GetBookingsRepository,
    private readonly createBookingRepository: CreateBookingRepository,
  ) {}

  async book(dto: BookTableDTO): Promise<Booking> {
    const bookings = await this.getBookingsRepository.get({
      where: {
        tableID: {
          equals: dto.tableID,
        },
      },
    })

    if (bookings.length) {
      throw new TableNotFreeError()
    } else {
      return await this.createBookingRepository.create({
        userID: dto.userID,
        tableID: dto.tableID,
        date: dto.date,
      })
    }
  }
}
