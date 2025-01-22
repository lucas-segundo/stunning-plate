import { z } from 'zod'

export const makeBookTableSchema = () => {
  return z.object({
    userID: z.string(),
    tableID: z.string(),
    date: z.string().datetime(),
  })
}
