import { z } from 'zod'

export const RuntimeStatusSchema = z.enum(['healthy', 'offline'])

export const RuntimeHealthSchema = z.object({
  status: RuntimeStatusSchema,
  version: z.string().nullable(),
  timestamp: z.number().nullable(),
})
