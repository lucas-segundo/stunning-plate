import { KnownError } from './KnownError'

export class NotFoundError extends KnownError {
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}
