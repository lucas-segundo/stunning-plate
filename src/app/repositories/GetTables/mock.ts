import { GetTablesRepository, GetTablesRepositoryParams } from '.'

export const mockGetTablesRepositoryParams = (): GetTablesRepositoryParams => ({
  where: {
    seats: {
      equals: 1,
    },
  },
})

export const mockGetTablesRepository =
  (): jest.Mocked<GetTablesRepository> => ({
    get: jest.fn(),
  })
