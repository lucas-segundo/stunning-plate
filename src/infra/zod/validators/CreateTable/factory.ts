import { ZodCreateTableValidator } from '.'

export const makeZodCreateTableValidator = (): ZodCreateTableValidator => {
  return new ZodCreateTableValidator()
}
