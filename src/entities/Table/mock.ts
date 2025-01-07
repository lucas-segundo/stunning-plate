import { Table } from '.'
import { faker } from '@faker-js/faker'

export const mockTable = (): Table => ({
  id: faker.string.uuid(),
  status: 'free',
  seats: faker.number.int({ min: 1, max: 10 }),
})
