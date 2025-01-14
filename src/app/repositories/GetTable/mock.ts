import { GetTableRepository } from '.'

export const mockGetTableRepository = (): jest.Mocked<GetTableRepository> => ({
  get: jest.fn(),
})
