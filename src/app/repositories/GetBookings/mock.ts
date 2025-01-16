import { GetBookingsRepository, GetBookingsRepositoryParams } from '.'

export const mockGetBookingsRepositoryParams =
  (): GetBookingsRepositoryParams => ({
    where: {
      tableID: {
        equals: '1',
      },
    },
  })

export const mockGetBookingsRepository =
  (): jest.Mocked<GetBookingsRepository> => ({
    get: jest.fn(),
  })
