import { KnownError } from 'app/errors/KnownError'
import { UnexpectedError } from 'app/errors/UnexpectedError'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from 'presentation/interfaces/Controller'

export class ErrorHandlerProxy implements Controller {
  constructor(private readonly controller: Controller) {}

  async handle(params: any): Promise<HTTPResponse | HTTPErrorResponse> {
    try {
      return await this.controller.handle(params)
    } catch (error) {
      return this.handleError(error)
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
