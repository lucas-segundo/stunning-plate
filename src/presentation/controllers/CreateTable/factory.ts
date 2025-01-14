import { CreateTableController } from '.'
import { makePrismaCreateTableRepository } from 'infra/prisma/repositories/CreateTable/factory'

export const makeCreateTableController = (): CreateTableController => {
  return new CreateTableController(makePrismaCreateTableRepository())
}
