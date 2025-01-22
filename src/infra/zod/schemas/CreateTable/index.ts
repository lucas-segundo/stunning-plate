import { z } from 'zod'

export const makeCreateTableSchema = () => {
  return z.object({
    seats: z.number().positive(),
  })
}
