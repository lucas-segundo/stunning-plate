import { z } from 'zod'

export const makeGetTablesSchema = () => {
  return z.object({
    seats: z
      .object({
        equals: z.number({ coerce: true }).positive().optional(),
        greaterThanOrEqual: z.number({ coerce: true }).positive().optional(),
        lessThanOrEqual: z.number({ coerce: true }).positive().optional(),
      })
      .optional(),
  })
}
