import { CreateTableRepository } from '.'

export const mockCreateTableRepository =
  (): jest.Mocked<CreateTableRepository> => ({
    create: jest.fn(),
  })
