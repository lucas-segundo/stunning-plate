import {
  GetTablesRepository,
  GetTablesRepositoryParams,
} from 'app/repositories/GetTables'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from '../../interfaces/Controller'
import { UseErrorHandler } from 'presentation/decorators/ErrorHandler'
import { Validation } from 'presentation/interfaces/Validation'

export type GetTablesControllerParams = GetTablesRepositoryParams['where']

export class GetTablesController implements Controller {
  constructor(
    private readonly getTablesRepo: GetTablesRepository,
    private readonly validation: Validation,
  ) {}

  @UseErrorHandler()
  async handle(
    params: GetTablesControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    await this.validation.validate(params)
    const tables = await this.getTablesRepo.get({ where: params })
    return new HTTPResponse(tables, 200)
  }
}
