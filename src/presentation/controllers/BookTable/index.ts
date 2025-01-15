import { BookTableDTO, BookTableUseCase } from 'app/useCases/BookTable'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from '../../interfaces/Controller'
import { UseErrorHandler } from 'presentation/decorators/ErrorHandler'

export type BookTableControllerParams = BookTableDTO

export class BookTableController implements Controller {
  constructor(private readonly bookTableUseCase: BookTableUseCase) {}

  @UseErrorHandler()
  async handle(
    params: BookTableControllerParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const table = await this.bookTableUseCase.book(params)
    return new HTTPResponse(table, 201)
  }
}
