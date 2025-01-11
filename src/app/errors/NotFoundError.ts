import { KnownError } from './KnownError'

export class NotFoundError extends KnownError {
  constructor(message: string) {
    super(message, 404)
    this.name = 'NOT_FOUND_ERROR'
  }
}
