import { KnownError } from './KnownError'

export class UnexpectedError extends KnownError {
  constructor() {
    super('An unexpected error occurred')
    this.name = 'UnexpectedError'
  }
}
