import { ValidationError } from 'app/errors/ValidationError'
import { ZodCreateTableValidator } from './index'
import { CreateTableControllerParams } from 'presentation/controllers/CreateTable'

const makeMocks = () => {
  const sut = new ZodCreateTableValidator()

  return { sut }
}

describe('ZodCreateTableValidator', () => {
  it('should return nothing when data is valid', async () => {
    const { sut } = makeMocks()

    const data: CreateTableControllerParams = { seats: 4 }
    const result = await sut.validate(data)
    expect(result).toEqual(undefined)
  })

  it('should throw error when data is invalid', () => {
    const { sut } = makeMocks()

    const data: CreateTableControllerParams = { seats: -1 }
    const result = sut.validate(data)
    expect(result).rejects.toThrow(ValidationError)
  })
})
