import { CreateUserRepository } from 'app/repositories/CreateUser'
import { PrismaCreateUserRepository } from '.'

export const makePrismaCreateUserRepository = (): CreateUserRepository => {
  return new PrismaCreateUserRepository()
}
