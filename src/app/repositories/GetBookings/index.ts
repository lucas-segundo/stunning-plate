import { Booking } from 'entities/Booking'

export interface GetBookingsRepositoryParams {
  where?: {
    tableID?: {
      equals?: number
    }
  }
}

export interface GetBookingsRepository {
  get(params: GetBookingsRepositoryParams): Promise<Booking[]>
}
