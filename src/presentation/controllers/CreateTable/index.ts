import {
  CreateTableRepository,
  CreateTableRepositoryParams,
} from 'app/repositories/CreateTable'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from '../../interfaces/Controller'
import { ControllerErrorHandler } from 'presentation/utils/ControllerErrorHandler'

export class CreateTableController
  extends ControllerErrorHandler
  implements Controller
{
  constructor(private readonly createTableRepo: CreateTableRepository) {
    super()
  }

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
}
