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
import { Validation } from 'presentation/interfaces/Validation'

export type CreateUserControllerParams = CreateUserRepositoryParams

export class CreateUserController implements Controller {
  constructor(
    private readonly createUserRepo: CreateUserRepository,
    private readonly validation: Validation,
  ) {}

  @UseErrorHandler()
  async handle(
    params: CreateUserRepositoryParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    await this.validation.validate(params)
    const table = await this.createUserRepo.create(params)
    return new HTTPResponse(table, 201)
  }
}
