import { makeCreateUserSchema } from './index'

describe('makeCreateUserSchema', () => {
  const schema = makeCreateUserSchema()

  it('should validate with valid data', () => {
    const validData = {
      name: 'John Doe',
    }
    expect(() => schema.parse(validData)).not.toThrow()
  })

  it('should throw error for name too short', () => {
    const invalidData = {
      name: 'Jo',
    }
    expect(() => schema.parse(invalidData)).toThrow()
  })

  it('should throw error for missing name', () => {
    const invalidData = {}
    expect(() => schema.parse(invalidData)).toThrow()
  })

  it('should throw error for non-string name', () => {
    const invalidData = {
      name: 123,
    }
    expect(() => schema.parse(invalidData)).toThrow()
  })
})
