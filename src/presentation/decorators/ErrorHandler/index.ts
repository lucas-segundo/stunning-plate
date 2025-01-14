import { KnownError } from 'app/errors/KnownError'
import { UnexpectedError } from 'app/errors/UnexpectedError'
import { HTTPErrorResponse } from 'presentation/interfaces/Controller'

export const UseErrorHandler = () =>
  function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args)
      } catch (error) {
        return handleError(error)
      }
    }

    return descriptor
  }

const handleError = (error: unknown): HTTPErrorResponse => {
  if (error instanceof KnownError) {
    return new HTTPErrorResponse(error)
  } else {
    console.error(error)
    return new HTTPErrorResponse(new UnexpectedError())
  }
}
