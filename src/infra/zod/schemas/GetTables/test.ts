import { makeGetTablesSchema } from './index'

describe('makeGetTablesSchema', () => {
  const schema = makeGetTablesSchema()

  it('should validate with valid data', () => {
    const validData = {
      seats: {
        equals: 4,
        greaterThanOrEqual: 2,
        lessThanOrEqual: 6,
      },
    }
    expect(() => schema.parse(validData)).not.toThrow()
  })

  it('should validate with optional fields', () => {
    const validData = {
      seats: {
        equals: 4,
      },
    }
    expect(() => schema.parse(validData)).not.toThrow()
  })

  it('should validate with no seats object', () => {
    const validData = {}
    expect(() => schema.parse(validData)).not.toThrow()
  })

  it('should throw error for negative numbers', () => {
    const invalidData = {
      seats: {
        equals: -4,
      },
    }
    expect(() => schema.parse(invalidData)).toThrow()
  })

  it('should throw error for non-numeric values', () => {
    const invalidData = {
      seats: {
        equals: 'four',
      },
    }
    expect(() => schema.parse(invalidData)).toThrow()
  })

  it('should throw error for non-positive numbers', () => {
    const invalidData = {
      seats: {
        equals: 0,
      },
    }
    expect(() => schema.parse(invalidData)).toThrow()
  })
})
