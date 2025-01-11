import {
  CreateTableRepository,
  CreateTableRepositoryParams,
} from 'app/repositories/CreateTable'
import { Controller, HTTPErrorResponse, HTTPResponse } from '..'
import { UnexpectedError } from 'app/errors/UnexpectedError'
import { KnownError } from 'app/errors/KnownError'

export class CreateTableController implements Controller {
  constructor(private readonly createTableRepo: CreateTableRepository) {}

  async handle(
    params: CreateTableRepositoryParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    try {
      const table = await this.createTableRepo.create(params)
      return new HTTPResponse(table, 201)
    } catch (error) {
      return this.handleError(error)
    }
  }

  handleError(error: unknown): HTTPErrorResponse {
    if (error instanceof KnownError) {
      return new HTTPErrorResponse(error)
    } else {
      return new HTTPErrorResponse(new UnexpectedError())
    }
  }
}
