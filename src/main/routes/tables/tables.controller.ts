import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common'
import { Response } from 'express'
import { ResponseHelper } from 'main/helpers/Response'
import {
  CreateTableController,
  CreateTableControllerParams,
} from 'presentation/controllers/CreateTable'
import {
  GetTablesController,
  GetTablesControllerParams,
} from 'presentation/controllers/GetTables'

@Controller('tables')
export class TablesController {
  constructor(
    private readonly createTableController: CreateTableController,
    private readonly getTablesController: GetTablesController,
    private readonly responseHelper: ResponseHelper,
  ) {}

  @Post()
  async create(
    @Body() params: CreateTableControllerParams,
    @Res() res: Response,
  ) {
    const result = await this.createTableController.handle(params)

    this.responseHelper.respond(res, result)
  }

  @Get()
  async get(@Query() params: GetTablesControllerParams, @Res() res: Response) {
    const result = await this.getTablesController.handle(params)

    this.responseHelper.respond(res, result)
  }
}
