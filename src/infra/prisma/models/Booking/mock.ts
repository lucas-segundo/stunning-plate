import { faker } from '@faker-js/faker'
import { PrismaBooking } from '.'

export const mockPrismaBooking = (): PrismaBooking => ({
  id: faker.number.int(),
  userID: faker.number.int(),
  tableID: faker.number.int(),
  date: faker.date.recent(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
})
