import { PrismaCreateTableRepository } from '.'

export const makePrismaCreateTableRepository = () => {
  return new PrismaCreateTableRepository()
}
