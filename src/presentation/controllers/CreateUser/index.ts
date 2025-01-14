import {
  CreateUserRepository,
  CreateUserRepositoryParams,
} from 'app/repositories/CreateUser'
import {
  Controller,
  HTTPErrorResponse,
  HTTPResponse,
} from '../../interfaces/Controller'
import { UseErrorHandler } from 'presentation/decorators/ErrorHandler'

export type CreateUserControllerParams = CreateUserRepositoryParams

export class CreateUserController implements Controller {
  constructor(private readonly createUserRepo: CreateUserRepository) {}

  @UseErrorHandler()
  async handle(
    params: CreateUserRepositoryParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    const table = await this.createUserRepo.create(params)
    return new HTTPResponse(table, 201)
  }
}
