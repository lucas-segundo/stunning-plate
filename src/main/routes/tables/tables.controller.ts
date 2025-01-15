import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import {
  CreateTableController,
  CreateTableControllerParams,
} from 'presentation/controllers/CreateTable'
import { HTTPResponse } from 'presentation/interfaces/Controller'

@Controller('tables')
export class TablesController {
  constructor(private readonly createTableController: CreateTableController) {}

  @Post()
  async create(
    @Body() params: CreateTableControllerParams,
    @Res() res: Response,
  ) {
    const result = await this.createTableController.handle(params)

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
