import {
  ValidationError,
  ValidationFieldError,
} from 'app/errors/ValidationError'
import { ZodError } from 'zod'

export const adaptErrorFromZod = (error: ZodError): ValidationError => {
  const fieldErrors = error.issues.map<ValidationFieldError>((issue) => ({
    code: issue.code.toLocaleUpperCase(),
    name: issue.path.join('.'),
    message: issue.message,
  }))

  return new ValidationError(fieldErrors)
}
