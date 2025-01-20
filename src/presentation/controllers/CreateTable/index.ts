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
import { Validation } from 'presentation/interfaces/Validation'

export type CreateTableControllerParams = CreateTableRepositoryParams

export class CreateTableController implements Controller {
  constructor(
    private readonly createTableRepo: CreateTableRepository,
    private readonly validation: Validation,
  ) {}

  @UseErrorHandler()
  async handle(
    params: CreateTableRepositoryParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    await this.validation.validate(params)
    const table = await this.createTableRepo.create(params)
    return new HTTPResponse(table, 201)
  }
}
