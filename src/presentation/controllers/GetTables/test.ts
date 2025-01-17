import {
  mockGetTablesRepository,
  mockGetTablesRepositoryParams,
} from 'app/repositories/GetTables/mock'
import { GetTablesController } from '.'
import { mockTable } from 'entities/Table/mock'
import { HTTPResponse } from '../../interfaces/Controller'

const makeMocks = () => {
  const getTablesRepo = mockGetTablesRepository()
  const sut = new GetTablesController(getTablesRepo)

  return { sut, getTablesRepo }
}

describe('GetTablesController', () => {
  it('should call get tables repo with right params', async () => {
    const { getTablesRepo, sut } = makeMocks()

    const params = mockGetTablesRepositoryParams()
    await sut.handle(params)

    expect(getTablesRepo.get).toHaveBeenCalledWith(params)
  })

  it('should return 200 on success', async () => {
    const { sut, getTablesRepo } = makeMocks()
    const tables = [mockTable(), mockTable()]
    getTablesRepo.get.mockResolvedValueOnce(tables)

    const response = (await sut.handle(
      mockGetTablesRepositoryParams(),
    )) as HTTPResponse

    expect(response.data).toBe(tables)
    expect(response.statusCode).toBe(200)
  })
})
