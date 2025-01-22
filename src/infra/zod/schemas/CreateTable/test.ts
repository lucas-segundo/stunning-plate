import { makeCreateTableSchema } from './index'

describe('makeCreateTableSchema', () => {
  const schema = makeCreateTableSchema()

  it('should validate with valid data', () => {
    const validData = {
      seats: 4,
    }
    expect(() => schema.parse(validData)).not.toThrow()
  })

  it('should throw error for negative numbers', () => {
    const invalidData = {
      seats: -4,
    }
    expect(() => schema.parse(invalidData)).toThrow()
  })

  it('should throw error for non-numeric values', () => {
    const invalidData = {
      seats: 'four',
    }
    expect(() => schema.parse(invalidData)).toThrow()
  })

  it('should throw error for missing seats', () => {
    const invalidData = {}
    expect(() => schema.parse(invalidData)).toThrow()
  })

  it('should throw error for zero seats', () => {
    const invalidData = {
      seats: 0,
    }
    expect(() => schema.parse(invalidData)).toThrow()
  })
})
