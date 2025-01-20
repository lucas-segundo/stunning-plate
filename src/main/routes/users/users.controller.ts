import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { ResponseHelper } from 'main/helpers/Response'
import {
  CreateUserController,
  CreateUserControllerParams,
} from 'presentation/controllers/CreateUser'

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserController: CreateUserController,
    private readonly responseHelper: ResponseHelper,
  ) {}

  @Post()
  async create(
    @Body() params: CreateUserControllerParams,
    @Res() res: Response,
  ) {
    const result = await this.createUserController.handle(params)

    this.responseHelper.respond(res, result)
  }
}
