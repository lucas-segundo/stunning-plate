import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { ResponseHelper } from 'main/helpers/Response'
import {
  BookTableController,
  BookTableControllerParams,
} from 'presentation/controllers/BookTable'

@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookTableController: BookTableController,
    private readonly responseHelper: ResponseHelper,
  ) {}

  @Post()
  async create(
    @Body() params: BookTableControllerParams,
    @Res() res: Response,
  ) {
    const result = await this.bookTableController.handle(params)

    this.responseHelper.respond(res, result)
  }
}
