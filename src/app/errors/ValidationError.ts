import { KnownError } from './KnownError'

export class ValidationError extends KnownError {
  code: string
  field: string

  constructor(code: string, field: string, message: string) {
    super(message)
    this.code = code
    this.field = field
  }
}
