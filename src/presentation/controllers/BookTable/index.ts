import { BookTableDTO, BookTableUseCase } from 'app/useCases/BookTable'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from '../../interfaces/Controller'
import { UseErrorHandler } from 'presentation/decorators/ErrorHandler'

export interface BookTableControllerParams extends Omit<BookTableDTO, 'date'> {
  date: string
}

export class BookTableController implements Controller {
  constructor(private readonly bookTableUseCase: BookTableUseCase) {}

  @UseErrorHandler()
  async handle(
    params: BookTableControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const table = await this.bookTableUseCase.book({
      ...params,
      date: new Date(params.date),
    })
    return new HTTPResponse(table, 201)
  }
}
