import { faker } from '@faker-js/faker'
import { PrismaUser } from '.'

export const mockPrismaUser = (): PrismaUser => ({
  id: faker.number.int(),
  name: faker.person.fullName(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
})
