import { ValidationError } from 'app/errors/ValidationError'
import { Validation } from 'presentation/interfaces/Validation'
import { z, ZodError } from 'zod'

export class ZodValidation implements Validation {
  constructor(private readonly schema: z.ZodObject<any>) {}

  async validate(data: Record<string, unknown>): Promise<void> {
    const result = await this.schema.safeParseAsync(data)

    if (!result.success) {
      throw this.adaptZodError(result.error)
    }
  }

  private adaptZodError(error: ZodError) {
    const fieldErrors = error.issues.map((issue) => ({
      code: issue.code.toLocaleUpperCase(),
      name: issue.path.join('.'),
      message: issue.message,
    }))

    return new ValidationError(fieldErrors)
  }
}
