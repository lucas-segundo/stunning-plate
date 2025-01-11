import {
  mockCreateUserRepository,
  mockCreateUserRepositoryParams,
} from 'app/repositories/CreateUser/mock'
import { CreateUserController } from '.'
import { mockUser } from 'entities/User/mock'
import { HTTPErrorResponse, HTTPResponse } from '..'
import { UnexpectedError } from 'app/errors/UnexpectedError'

const makeMocks = () => {
  const createUserRepo = mockCreateUserRepository()
  const sut = new CreateUserController(createUserRepo)

  return { sut, createUserRepo }
}

describe('CreateUserController', () => {
  it('should call create table repo with right params', async () => {
    const { createUserRepo, sut } = makeMocks()

    const params = mockCreateUserRepositoryParams()
    await sut.handle(params)

    expect(createUserRepo.create).toHaveBeenCalledWith(params)
  })

  it('should return 201 on success', async () => {
    const { sut, createUserRepo } = makeMocks()
    const table = mockUser()
    createUserRepo.create.mockResolvedValueOnce(table)

    const response = (await sut.handle(
      mockCreateUserRepositoryParams(),
    )) as HTTPResponse

    expect(response.data).toBe(table)
    expect(response.statusCode).toBe(201)
  })

  it('should return 500 on failure', async () => {
    const { sut, createUserRepo } = makeMocks()
    createUserRepo.create.mockRejectedValueOnce(new Error('any_error'))

    const response = (await sut.handle(
      mockCreateUserRepositoryParams(),
    )) as HTTPErrorResponse

    expect(response.error).toBeInstanceOf(UnexpectedError)
  })
})
