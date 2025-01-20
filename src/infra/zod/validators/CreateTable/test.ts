import { ValidationError } from 'app/errors/ValidationError'
import { ZodCreateTableValidator } from './index'

const makeMocks = () => {
  const sut = new ZodCreateTableValidator()

  return { sut }
}

describe('ZodCreateTableValidator', () => {
  it('should return an empty array when data is valid', () => {
    const { sut } = makeMocks()

    const data = { seats: 4 }
    const result = sut.validate(data)
    expect(result).toEqual([])
  })

  it('should return errors when data is invalid', () => {
    const { sut } = makeMocks()

    const data = { seats: -1 }
    const result = sut.validate(data)
    expect(result).toHaveLength(1)
    expect(result[0]).toBeInstanceOf(ValidationError)
  })
})
