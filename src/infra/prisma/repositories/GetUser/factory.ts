import { PrismaGetUserRepository } from '.'

export const makePrismaGetUserRepository = () => {
  return new PrismaGetUserRepository()
}
