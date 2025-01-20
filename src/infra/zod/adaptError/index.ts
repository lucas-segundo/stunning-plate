import { ValidationError } from 'presentation/interfaces/Validation'
import { ZodError } from 'zod'

export const adaptErrorFromZod = (error: ZodError): ValidationError[] => {
  return error.issues.map((issue) => ({
    code: issue.code,
    field: issue.path.join('.'),
    message: issue.message,
  }))
}
