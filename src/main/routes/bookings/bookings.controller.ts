import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import {
  BookTableController,
  BookTableControllerParams,
} from 'presentation/controllers/BookTable'
import { HTTPResponse } from 'presentation/interfaces/Controller'

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookTableController: BookTableController) {}

  @Post()
  async create(
    @Body() params: BookTableControllerParams,
    @Res() res: Response,
  ) {
    const result = await this.bookTableController.handle(params)

    if (result instanceof HTTPResponse) {
      return res.status(result.statusCode).json(result.data)
    } else {
      return res.status(result.error.statusCode).json({
        name: result.error.name,
        message: result.error.message,
      })
    }
  }
}
