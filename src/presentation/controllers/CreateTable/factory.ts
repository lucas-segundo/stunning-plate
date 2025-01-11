import { CreateTableController } from '.'
import { makeProxyControllerErrorHandler } from 'presentation/utils/ProxyHandlerControllerError/factory'
import { makePrismaCreateTableRepository } from 'infra/prisma/repositories/CreateTable/factory'

export const makeCreateTableController = (): CreateTableController => {
  const controller = new CreateTableController(
    makePrismaCreateTableRepository(),
  )

  return new Proxy<CreateTableController>(
    controller,
    makeProxyControllerErrorHandler(),
  )
}
