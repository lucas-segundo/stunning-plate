import { adaptErrorFromZod } from 'infra/zod/adaptError'
import { CreateTableControllerParams } from 'presentation/controllers/CreateTable'
import { Validation } from 'presentation/interfaces/Validation'
import { z } from 'zod'

const schema = z.object({
  seats: z.number().int().positive(),
})

export class ZodCreateTableValidator implements Validation {
  async validate(data: CreateTableControllerParams): Promise<void> {
    const result = await schema.safeParseAsync(data)

    if (!result.success) {
      throw adaptErrorFromZod(result.error)
    }
  }
}
