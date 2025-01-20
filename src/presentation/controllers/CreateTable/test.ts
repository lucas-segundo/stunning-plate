import { mockCreateTableRepository } from 'app/repositories/CreateTable/mock'
import { CreateTableController } from '.'
import { mockTable } from 'entities/Table/mock'
import { HTTPResponse } from '../../interfaces/Controller'
import { mockValidation } from 'presentation/interfaces/Validation/mock'

const makeMocks = () => {
  const createTableRepo = mockCreateTableRepository()
  const validation = mockValidation()
  validation.validate.mockResolvedValue(undefined)
  const sut = new CreateTableController(createTableRepo, validation)

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
})
