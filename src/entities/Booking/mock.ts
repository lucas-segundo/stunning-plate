import { Booking } from '.'
import { faker } from '@faker-js/faker'

export const mockBooking = (): Booking => ({
  id: faker.string.uuid(),
  tableID: faker.string.uuid(),
  userID: faker.string.uuid(),
  date: faker.date.recent(),
})
