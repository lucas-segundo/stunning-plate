import { CreateUserController } from '.'
import { makeProxyControllerErrorHandler } from 'presentation/utils/ProxyHandlerControllerError/factory'
import { makePrismaCreateUserRepository } from 'infra/prisma/repositories/CreateUser/factory'

export const makeCreateUserController = (): CreateUserController => {
  const controller = new CreateUserController(makePrismaCreateUserRepository())

  return new Proxy<CreateUserController>(
    controller,
    makeProxyControllerErrorHandler(),
  )
}
