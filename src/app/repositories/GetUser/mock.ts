import { GetUserRepository } from '.'

export const mockGetUserRepository = (): jest.Mocked<GetUserRepository> => ({
  get: jest.fn(),
})
