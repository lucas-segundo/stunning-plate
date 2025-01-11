import {
  CreateTableRepository,
  CreateTableRepositoryParams,
} from 'app/repositories/CreateTable'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from '../../interfaces/Controller'

export class CreateTableController implements Controller {
  constructor(private readonly createTableRepo: CreateTableRepository) {}

  async handle(
    params: CreateTableRepositoryParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const table = await this.createTableRepo.create(params)
    return new HTTPResponse(table, 201)
  }
}
