import { BookTableDTO, BookTableUseCase } from 'app/useCases/BookTable'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from '../../interfaces/Controller'
import { UseErrorHandler } from 'presentation/decorators/ErrorHandler'
import { Validation } from 'presentation/interfaces/Validation'

export interface BookTableControllerParams extends Omit<BookTableDTO, 'date'> {
  date: string
}

export class BookTableController implements Controller {
  constructor(
    private readonly bookTableUseCase: BookTableUseCase,
    private readonly validation: Validation,
  ) {}

  @UseErrorHandler()
  async handle(
    params: BookTableControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    await this.validation.validate(params)
    const table = await this.bookTableUseCase.book({
      ...params,
      date: new Date(params.date),
    })
    return new HTTPResponse(table, 201)
  }
}
