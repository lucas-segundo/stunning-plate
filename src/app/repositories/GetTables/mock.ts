import { GetTablesRepository } from '.'

export const mockGetTablesRepository =
  (): jest.Mocked<GetTablesRepository> => ({
    get: jest.fn(),
  })
