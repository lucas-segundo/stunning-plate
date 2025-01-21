import {
  ValidationError,
  ValidationFieldError,
} from 'app/errors/ValidationError'
import { ZodValidation } from './index'
import { CreateTableControllerParams } from 'presentation/controllers/CreateTable'
import { SafeParseError, z, ZodError, ZodIssueCode } from 'zod'

const makeMocks = () => {
  const schema = z.object({
    seats: z.number().positive(),
  })
  const sut = new ZodValidation(schema)

  return { sut, schema }
}

describe('ZodValidation', () => {
  it('should return nothing when data is valid', async () => {
    const { sut } = makeMocks()

    const data: CreateTableControllerParams = { seats: 4 }
    const result = await sut.validate(data)
    expect(result).toEqual(undefined)
  })

  it('should throw error when data is invalid', () => {
    const { sut, schema } = makeMocks()

    const zodError = new ZodError([
      {
        code: ZodIssueCode.too_small,
        type: 'number',
        minimum: 1,
        inclusive: true,
        path: ['age'],
        message: 'Value should be greater than or equal to 1',
      },
    ])
    const errorResult: SafeParseError<{ seats: number }> = {
      success: false,
      error: zodError,
    }

    const parseSpy = jest.spyOn(schema, 'safeParseAsync')
    parseSpy.mockResolvedValue(errorResult)

    const expectedErrors: ValidationFieldError[] = [
      {
        code: ZodIssueCode.too_small.toLocaleUpperCase(),
        name: 'age',
        message: 'Value should be greater than or equal to 1',
      },
    ]

    const data: CreateTableControllerParams = { seats: -1 }
    const result = sut.validate(data)
    expect(result).rejects.toThrow(new ValidationError(expectedErrors))
  })
})
