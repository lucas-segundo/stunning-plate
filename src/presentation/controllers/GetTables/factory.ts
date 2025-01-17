import { makePrismaGetTablesRepository } from 'infra/prisma/repositories/GetTables/factory'
import { GetTablesController } from '.'

export const makeGetTablesController = (): GetTablesController => {
  return new GetTablesController(makePrismaGetTablesRepository())
}
