import {
  mockCreateTableRepository,
  mockCreateTableRepositoryParams,
} from 'app/repositories/CreateTable/mock'
import { CreateTableController } from '.'
import { mockTable } from 'entities/Table/mock'
import { HTTPErrorResponse, HTTPResponse } from '..'
import { UnexpectedError } from 'app/errors/UnexpectedError'

const makeMocks = () => {
  const createTableRepo = mockCreateTableRepository()
  const sut = new CreateTableController(createTableRepo)

  return { sut, createTableRepo }
}

describe('CreateTableController', () => {
  it('should call create table repo with right params', async () => {
    const { createTableRepo, sut } = makeMocks()

    const params = mockCreateTableRepositoryParams()
    await sut.handle(params)

    expect(createTableRepo.create).toHaveBeenCalledWith(params)
  })

  it('should return 201 on success', async () => {
    const { sut, createTableRepo } = makeMocks()
    const table = mockTable()
    createTableRepo.create.mockResolvedValueOnce(table)

    const response = (await sut.handle(
      mockCreateTableRepositoryParams(),
    )) as HTTPResponse

    expect(response.data).toBe(table)
    expect(response.statusCode).toBe(201)
  })

  it('should return 500 on failure', async () => {
    const { sut, createTableRepo } = makeMocks()
    createTableRepo.create.mockRejectedValueOnce(new Error('any_error'))

    const response = (await sut.handle(
      mockCreateTableRepositoryParams(),
    )) as HTTPErrorResponse

    expect(response.error).toBeInstanceOf(UnexpectedError)
    expect(response.statusCode).toBe(500)
  })
})
