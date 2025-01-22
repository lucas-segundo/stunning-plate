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

export interface GetTablesControllerParams {
  seats?: {
    equals?: string
    greaterThanOrEqual?: string
    lessThanOrEqual?: string
  }
}

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
    const tables = await this.getTablesRepo.get(this.adaptParams(params))
    return new HTTPResponse(tables, 200)
  }

  private adaptParams({
    seats,
  }: GetTablesControllerParams): GetTablesRepositoryParams {
    return {
      where: {
        seats: this.adaptSeats(seats),
      },
    }
  }

  private adaptSeats(seats: GetTablesControllerParams['seats']) {
    return {
      equals: seats?.equals ? parseInt(seats.equals) : undefined,
      greaterThanOrEqual: seats?.greaterThanOrEqual
        ? parseInt(seats.greaterThanOrEqual)
        : undefined,
      lessThanOrEqual: seats?.lessThanOrEqual
        ? parseInt(seats.lessThanOrEqual)
        : undefined,
    }
  }
}
