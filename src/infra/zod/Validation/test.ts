import { ValidationError } from 'app/errors/ValidationError'
import { ZodValidation } from './index'
import { CreateTableControllerParams } from 'presentation/controllers/CreateTable'
import { z } from 'zod'

const makeMocks = () => {
  const schema = z.object({
    seats: z.number().positive(),
  })
  const sut = new ZodValidation(schema)

  return { sut }
}

describe('ZodValidation', () => {
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
