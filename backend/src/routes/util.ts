import { z } from 'zod'

export const numberParamSchema = z.object({
  id: z.string().pipe(z.coerce.number()),
})

export const stringParamSchema = z.object({
  id: z.string(),
})
