import { CreateBookingRepository } from '.'

export const mockCreateBookingRepository =
  (): jest.Mocked<CreateBookingRepository> => ({
    create: jest.fn(),
  })
