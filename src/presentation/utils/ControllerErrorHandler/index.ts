import { KnownError } from 'app/errors/KnownError'
import { UnexpectedError } from 'app/errors/UnexpectedError'
import { HTTPErrorResponse } from 'presentation/interfaces/Controller'

export abstract class ControllerErrorHandler {
  handleError(error: unknown): HTTPErrorResponse {
    if (error instanceof KnownError) {
      return new HTTPErrorResponse(error)
    } else {
      return new HTTPErrorResponse(new UnexpectedError())
    }
  }
}
