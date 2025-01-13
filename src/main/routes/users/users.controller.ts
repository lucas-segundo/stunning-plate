import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import {
  CreateUserController,
  CreateUserControllerParams,
} from 'presentation/controllers/CreateUser'
import { HTTPResponse } from 'presentation/interfaces/Controller'

@Controller('users')
export class UsersController {
  constructor(private readonly createUserController: CreateUserController) {}

  @Post()
  async create(
    @Body() params: CreateUserControllerParams,
    @Res() res: Response,
  ) {
    const result = await this.createUserController.handle(params)

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
