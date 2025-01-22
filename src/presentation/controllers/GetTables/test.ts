import { mockGetTablesRepository } from 'app/repositories/GetTables/mock'
import { GetTablesController, GetTablesControllerParams } from '.'
import { mockTable } from 'entities/Table/mock'
import { HTTPResponse } from '../../interfaces/Controller'
import { mockValidation } from 'presentation/interfaces/Validation/mock'
import { faker } from '@faker-js/faker/.'
import { GetTablesRepositoryParams } from 'app/repositories/GetTables'

const mockControllerParams = (): GetTablesControllerParams => ({
  seats: {
    equals: faker.number.int().toString(),
    greaterThanOrEqual: faker.number.int().toString(),
  },
})

const makeMocks = () => {
  const getTablesRepo = mockGetTablesRepository()
  const validation = mockValidation()
  const sut = new GetTablesController(getTablesRepo, validation)
  const params = mockControllerParams()

  return { sut, getTablesRepo, validation, params }
}

describe('GetTablesController', () => {
  it('should call get tables repo with right params', async () => {
    const { getTablesRepo, sut, params } = makeMocks()

    await sut.handle(params)

    const expectedParams: GetTablesRepositoryParams = {
      where: {
        seats: {
          equals: parseInt(params.seats!.equals!),
          greaterThanOrEqual: parseInt(params.seats!.greaterThanOrEqual!),
          lessThanOrEqual: undefined,
        },
      },
    }

    expect(getTablesRepo.get).toHaveBeenCalledWith(expectedParams)
  })

  it('should call validation with right params', async () => {
    const { sut, validation, params } = makeMocks()

    await sut.handle(params)

    expect(validation.validate).toHaveBeenCalledWith(params)
  })

  it('should return 200 on success', async () => {
    const { sut, getTablesRepo, params } = makeMocks()
    const tables = [mockTable(), mockTable()]
    getTablesRepo.get.mockResolvedValueOnce(tables)

    const response = (await sut.handle(params)) as HTTPResponse

    expect(response.data).toBe(tables)
    expect(response.statusCode).toBe(200)
  })
})
