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

export type GetTablesControllerParams = GetTablesRepositoryParams

export class GetTablesController implements Controller {
  constructor(private readonly getTablesRepo: GetTablesRepository) {}

  @UseErrorHandler()
  async handle(
    params: GetTablesRepositoryParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const tables = await this.getTablesRepo.get(params)
    return new HTTPResponse(tables, 200)
  }
}
