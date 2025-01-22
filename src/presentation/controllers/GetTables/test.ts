import {
  mockGetTablesRepository,
  mockGetTablesRepositoryParams,
} from 'app/repositories/GetTables/mock'
import { GetTablesController } from '.'
import { mockTable } from 'entities/Table/mock'
import { HTTPResponse } from '../../interfaces/Controller'
import { mockValidation } from 'presentation/interfaces/Validation/mock'

const makeMocks = () => {
  const getTablesRepo = mockGetTablesRepository()
  const validation = mockValidation()
  const sut = new GetTablesController(getTablesRepo, validation)

  return { sut, getTablesRepo, validation }
}

describe('GetTablesController', () => {
  it('should call get tables repo with right params', async () => {
    const { getTablesRepo, sut } = makeMocks()

    const params = mockGetTablesRepositoryParams().where
    await sut.handle(params)

    expect(getTablesRepo.get).toHaveBeenCalledWith(params)
  })

  it('should call validation with right params', async () => {
    const { sut, validation } = makeMocks()

    const params = mockGetTablesRepositoryParams().where
    await sut.handle(params)

    expect(validation.validate).toHaveBeenCalledWith(params)
  })

  it('should return 200 on success', async () => {
    const { sut, getTablesRepo } = makeMocks()
    const tables = [mockTable(), mockTable()]
    getTablesRepo.get.mockResolvedValueOnce(tables)

    const response = (await sut.handle(
      mockGetTablesRepositoryParams().where,
    )) as HTTPResponse

    expect(response.data).toBe(tables)
    expect(response.statusCode).toBe(200)
  })
})
