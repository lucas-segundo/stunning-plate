import { ZodError, ZodIssueCode } from 'zod'
import { adaptErrorFromZod } from './index'
import { ValidationError } from 'app/errors/ValidationError'

describe('adaptErrorFromZod', () => {
  it('should adapt ZodError to ValidationError array', () => {
    const zodError = new ZodError([
      {
        code: ZodIssueCode.invalid_type,
        expected: 'string',
        received: 'number',
        path: ['name'],
        message: 'Expected string, received number',
      },
      {
        code: ZodIssueCode.too_small,
        type: 'number',
        minimum: 1,
        inclusive: true,
        path: ['age'],
        message: 'Value should be greater than or equal to 1',
      },
    ])

    const expectedErrors: ValidationError[] = [
      new ValidationError(
        'invalid_type',
        'name',
        'Expected string, received number',
      ),
      new ValidationError(
        'too_small',
        'age',
        'Value should be greater than or equal to 1',
      ),
    ]

    const result = adaptErrorFromZod(zodError)
    expect(result).toEqual(expectedErrors)
  })
})
