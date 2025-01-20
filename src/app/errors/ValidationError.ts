import { KnownError } from './KnownError'

export interface ValidationFieldError {
  code: string
  name: string
  message: string
}

export class ValidationError extends KnownError {
  constructor(public fieldErrors: ValidationFieldError[]) {
    super('Data sent has validation errors', 400)
    this.name = 'VALIDATION_ERROR'
  }
}
