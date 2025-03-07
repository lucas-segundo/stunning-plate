import { faker } from '@faker-js/faker'
import { PrismaTable } from '.'

export const mockPrismaTable = (): PrismaTable => ({
  id: faker.number.int(),
  seats: faker.number.int(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
})
