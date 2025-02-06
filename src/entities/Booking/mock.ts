import { Booking } from '.'
import { faker } from '@faker-js/faker'

export const mockBooking = (): Booking => ({
  id: faker.string.uuid(),
  tableID: faker.number.int().toString(),
  userID: faker.number.int().toString(),
  date: faker.date.recent(),
})
