import { Booking } from 'entities/Booking'

export interface GetBookingsRepositoryParams {
  where: {
    tableID?: {
      equals?: string
    }
  }
}

export interface GetBookingsRepository {
  get(params: GetBookingsRepositoryParams): Promise<Booking[]>
}
