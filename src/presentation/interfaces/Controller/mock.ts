import { Controller } from '.'

export const mockController = (): Controller => ({
  handle: jest.fn(),
})
