import { GetTablesRepository, GetTablesRepositoryParams } from '.'

export const mockGetTablesRepositoryParams = (): GetTablesRepositoryParams => ({
  where: {
    status: {
      equals: 'free',
    },
  },
})

export const mockGetTablesRepository =
  (): jest.Mocked<GetTablesRepository> => ({
    get: jest.fn(),
  })
