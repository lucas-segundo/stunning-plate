import { z } from 'zod'

export const makeCreateUserSchema = () => {
  return z.object({
    name: z.string().min(3),
  })
}
