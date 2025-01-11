import {
  CreateUserRepository,
  CreateUserRepositoryParams,
} from 'app/repositories/CreateUser'
import { Controller, HTTPErrorResponse, HTTPResponse } from '..'
import { UnexpectedError } from 'app/errors/UnexpectedError'

export class CreateUserController implements Controller {
  constructor(private readonly createUserRepo: CreateUserRepository) {}

  async handle(
    params: CreateUserRepositoryParams,
  ): Promise<HTTPResponse | HTTPErrorResponse> {
    try {
      const table = await this.createUserRepo.create(params)
      return new HTTPResponse(table, 201)
    } catch (error) {
      return new HTTPErrorResponse(new UnexpectedError())
    }
  }
}
