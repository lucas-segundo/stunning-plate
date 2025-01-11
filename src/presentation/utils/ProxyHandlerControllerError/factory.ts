import { ProxyHandlerControllerError } from '.'

export const makeProxyControllerErrorHandler = () => {
  return new ProxyHandlerControllerError()
}
