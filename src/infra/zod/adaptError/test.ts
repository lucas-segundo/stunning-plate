import { ZodError, ZodIssueCode } from 'zod'
import { adaptErrorFromZod } from './index'
import {
  ValidationError,
  ValidationFieldError,
} from 'app/errors/ValidationError'

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

    const fieldErrors: ValidationFieldError[] = [
      {
        code: ZodIssueCode.invalid_type.toLocaleUpperCase(),
        name: 'name',
        message: 'Expected string, received number',
      },
      {
        code: ZodIssueCode.too_small.toLocaleUpperCase(),
        name: 'age',
        message: 'Value should be greater than or equal to 1',
      },
    ]

    const expectedErrors = new ValidationError(fieldErrors)
    const result = adaptErrorFromZod(zodError)
    expect(result).toEqual(expectedErrors)
  })
})
