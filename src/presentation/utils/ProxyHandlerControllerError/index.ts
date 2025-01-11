import { KnownError } from 'app/errors/KnownError'
import { UnexpectedError } from 'app/errors/UnexpectedError'
import { HTTPErrorResponse } from 'presentation/interfaces/Controller'

export class ProxyHandlerControllerError implements ProxyHandler<any> {
  get(target: Record<string, any>, prop: string) {
    const targetProp = target[prop]
    const isMethod = typeof targetProp === 'function'
    if (isMethod) {
      return this.addProxy(targetProp)
    } else {
      return targetProp
    }
  }

  private addProxy(targetProp: (params: any) => Promise<any>) {
    return async (...args: any[]) => {
      try {
        return await targetProp(args)
      } catch (error) {
        return this.handleError(error)
      }
    }
  }

  private handleError(error: unknown): HTTPErrorResponse {
    if (error instanceof KnownError) {
      return new HTTPErrorResponse(error)
    } else {
      return new HTTPErrorResponse(new UnexpectedError())
    }
  }
}
