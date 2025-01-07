import { User } from '.'
import { faker } from '@faker-js/faker'

export const mockUser = (): User => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
})
