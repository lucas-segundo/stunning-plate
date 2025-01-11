import { KnownError } from './KnownError'

export class UnexpectedError extends KnownError {
  statusCode: number

  constructor() {
    super('An unexpected error occurred', 500)
    this.name = 'UNEXPECTED_ERROR'
  }
}
