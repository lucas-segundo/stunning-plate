import {
  CreateTableRepository,
  CreateTableRepositoryParams,
} from 'app/repositories/CreateTable'
import { Controller, HTTPErrorResponse, HTTPResponse } from '..'
import { UnexpectedError } from 'app/errors/UnexpectedError'

export class CreateTableController implements Controller {
  constructor(private readonly createTableRepo: CreateTableRepository) {}

  async handle(
    params: CreateTableRepositoryParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    try {
      const table = await this.createTableRepo.create(params)
      return new HTTPResponse(table, 201)
    } catch (error) {
      return new HTTPErrorResponse(new UnexpectedError(), 500)
    }
  }
}
