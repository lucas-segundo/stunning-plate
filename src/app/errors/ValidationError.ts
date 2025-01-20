import { KnownError } from './KnownError'

export class ValidationError extends KnownError {
  code: string
  field: string
  statusCode: number

  constructor(code: string, field: string, message: string) {
    super(message)
    this.code = code
    this.field = field
    this.statusCode = 400
  }
}
