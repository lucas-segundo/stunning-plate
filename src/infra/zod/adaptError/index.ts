import { ValidationError } from 'app/errors/ValidationError'
import { ZodError } from 'zod'

export const adaptErrorFromZod = (error: ZodError): ValidationError[] => {
  return error.issues.map(
    (issue) =>
      new ValidationError(issue.code, issue.path.join('.'), issue.message),
  )
}
