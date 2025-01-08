import { mockTable } from 'entities/Table/mock'
import { CreateTableRepository, CreateTableRepositoryParams } from '.'

export const mockCreateTableRepositoryParams =
  (): CreateTableRepositoryParams => {
    const table = mockTable()
    delete table.id

    return table as CreateTableRepositoryParams
  }

export const mockCreateTableRepository =
  (): jest.Mocked<CreateTableRepository> => ({
    create: jest.fn(),
  })
