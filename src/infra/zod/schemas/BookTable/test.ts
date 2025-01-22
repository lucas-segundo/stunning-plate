import { makeBookTableSchema } from './index'

describe('makeBookTableSchema', () => {
  const schema = makeBookTableSchema()

  it('should validate with valid data', () => {
    const validData = {
      userID: 'user123',
      tableID: 'table456',
      date: '2023-10-10T10:00:00Z',
    }
    expect(() => schema.parse(validData)).not.toThrow()
  })

  it('should throw error for missing userID', () => {
    const invalidData = {
      tableID: 'table456',
      date: '2023-10-10T10:00:00Z',
    }
    expect(() => schema.parse(invalidData)).toThrow()
  })

  it('should throw error for missing tableID', () => {
    const invalidData = {
      userID: 'user123',
      date: '2023-10-10T10:00:00Z',
    }
    expect(() => schema.parse(invalidData)).toThrow()
  })

  it('should throw error for missing date', () => {
    const invalidData = {
      userID: 'user123',
      tableID: 'table456',
    }
    expect(() => schema.parse(invalidData)).toThrow()
  })

  it('should throw error for invalid date format', () => {
    const invalidData = {
      userID: 'user123',
      tableID: 'table456',
      date: 'invalid-date',
    }
    expect(() => schema.parse(invalidData)).toThrow()
  })

  it('should throw error for non-string userID', () => {
    const invalidData = {
      userID: 123,
      tableID: 'table456',
      date: '2023-10-10T10:00:00Z',
    }
    expect(() => schema.parse(invalidData)).toThrow()
  })

  it('should throw error for non-string tableID', () => {
    const invalidData = {
      userID: 'user123',
      tableID: 456,
      date: '2023-10-10T10:00:00Z',
    }
    expect(() => schema.parse(invalidData)).toThrow()
  })
})
