import {
  mockCreateUserRepository,
  mockCreateUserRepositoryParams,
} from 'app/repositories/CreateUser/mock'
import { CreateUserController } from '.'
import { mockUser } from 'entities/User/mock'
import { HTTPResponse } from '../../interfaces/Controller'
import { mockValidation } from 'presentation/interfaces/Validation/mock'

const makeMocks = () => {
  const createUserRepo = mockCreateUserRepository()
  const validation = mockValidation()
  validation.validate.mockResolvedValue()
  const sut = new CreateUserController(createUserRepo, validation)

  return { sut, createUserRepo, validation }
}

describe('CreateUserController', () => {
  it('should call create table repo with right params', async () => {
    const { createUserRepo, sut } = makeMocks()

    const params = mockCreateUserRepositoryParams()
    await sut.handle(params)

    expect(createUserRepo.create).toHaveBeenCalledWith(params)
  })

  it('should call validation with right params', async () => {
    const { validation, sut } = makeMocks()

    const params = mockCreateUserRepositoryParams()
    await sut.handle(params)

    expect(validation.validate).toHaveBeenCalledWith(params)
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
})
