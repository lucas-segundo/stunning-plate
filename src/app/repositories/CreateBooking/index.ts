import { Booking } from 'entities/Booking'

export type CreateBookingRepositoryParams = Omit<Booking, 'id'>

export interface CreateBookingRepository {
  create(params: CreateBookingRepositoryParams): Promise<Booking>
}
