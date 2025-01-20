import { ValidationError } from 'app/errors/ValidationError'
import { adaptErrorFromZod } from 'infra/zod/adaptError'
import { CreateTableControllerParams } from 'presentation/controllers/CreateTable'
import { Validation } from 'presentation/interfaces/Validation'
import { z } from 'zod'

const schema = z.object({
  seats: z.number().int().positive(),
})

export class ZodCreateTableValidator implements Validation {
  validate(data: CreateTableControllerParams): ValidationError[] {
    const result = schema.safeParse(data)

    if (result.success) {
      return []
    } else {
      return adaptErrorFromZod(result.error)
    }
  }
}
