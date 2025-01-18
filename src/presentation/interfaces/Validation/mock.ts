import { Validation, ValidationError } from '.'
import { faker } from '@faker-js/faker'

export const mockValidationError = (): ValidationError => ({
  code: faker.string.uuid(),
  field: faker.database.column(),
  message: faker.lorem.sentence(),
})

export const mockValidation = (): jest.Mocked<Validation> => ({
  validate: jest.fn(),
})
