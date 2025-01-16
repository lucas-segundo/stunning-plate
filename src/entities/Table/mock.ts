import { Table } from '.'
import { faker } from '@faker-js/faker'

export const mockTable = (): Table => ({
  id: faker.string.uuid(),
  seats: faker.number.int({ min: 1, max: 10 }),
})
