import { mockCreateTableRepository } from 'app/repositories/CreateTable/mock'
import { CreateTableController } from '.'
import { mockTable } from 'entities/Table/mock'
import { HTTPErrorResponse, HTTPResponse } from '../../interfaces/Controller'
import { UnexpectedError } from 'app/errors/UnexpectedError'
import { KnownError } from 'app/errors/KnownError'
import { faker } from '@faker-js/faker/.'

const makeMocks = () => {
  const createTableRepo = mockCreateTableRepository()
  const sut = new CreateTableController(createTableRepo)

  return { sut, createTableRepo }
}

describe('CreateTableController', () => {
  it('should call create table repo with right params', async () => {
    const { createTableRepo, sut } = makeMocks()

    const params = mockTable()
    await sut.handle(params)

    expect(createTableRepo.create).toHaveBeenCalledWith(params)
  })

  it('should return 201 on success', async () => {
    const { sut, createTableRepo } = makeMocks()
    const table = mockTable()
    createTableRepo.create.mockResolvedValueOnce(table)

    const response = (await sut.handle(table)) as HTTPResponse

    expect(response.data).toBe(table)
    expect(response.statusCode).toBe(201)
  })

  it('should return known error', async () => {
    const { sut, createTableRepo } = makeMocks()
    const knownError = new KnownError(
      'any_error',
      faker.internet.httpStatusCode(),
    )
    createTableRepo.create.mockRejectedValueOnce(knownError)

    const response = (await sut.handle(mockTable())) as HTTPErrorResponse

    expect(response.error).toBeInstanceOf(KnownError)
  })

  it('should return 500 on failure', async () => {
    const { sut, createTableRepo } = makeMocks()
    createTableRepo.create.mockRejectedValueOnce(new Error('any_error'))

    const response = (await sut.handle(mockTable())) as HTTPErrorResponse

    expect(response.error).toBeInstanceOf(UnexpectedError)
  })
})
