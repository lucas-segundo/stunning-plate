import { TableNotFreeError } from 'app/errors/TableNotFreeError'
import { CreateBookingRepository } from 'app/repositories/CreateBooking'
import { GetTableRepository } from 'app/repositories/GetTable'
import { Booking } from 'entities/Booking'

interface DTO {
  userID: string
  tableID: string
  date: Date
}

export class BookTableUseCase {
  constructor(
    private readonly getTableRepository: GetTableRepository,
    private readonly createBookingRepository: CreateBookingRepository,
  ) {}

  async book(dto: DTO): Promise<Booking> {
    const table = await this.getTableRepository.get(dto.tableID)

    if (table.status === 'free') {
      return await this.createBookingRepository.create({
        userID: dto.userID,
        tableID: dto.tableID,
        date: dto.date,
      })
    } else {
      throw new TableNotFreeError()
    }
  }
}
