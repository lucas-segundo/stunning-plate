import { faker } from '@faker-js/faker'
import { CreateUserRepository, CreateUserRepositoryParams } from '.'

export const mockCreateUserRepositoryParams =
  (): CreateUserRepositoryParams => ({
    name: faker.lorem.word(),
  })

export const mockCreateUserRepository =
  (): jest.Mocked<CreateUserRepository> => ({
    create: jest.fn(),
  })
