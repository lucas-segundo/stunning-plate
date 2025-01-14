import {
  CreateTableRepository,
  CreateTableRepositoryParams,
} from 'app/repositories/CreateTable'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from '../../interfaces/Controller'
import { UseErrorHandler } from 'presentation/decorators/ErrorHandler'

export class CreateTableController implements Controller {
  constructor(private readonly createTableRepo: CreateTableRepository) {}

  @UseErrorHandler()
  async handle(
    params: CreateTableRepositoryParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const table = await this.createTableRepo.create(params)
    return new HTTPResponse(table, 201)
  }
}
