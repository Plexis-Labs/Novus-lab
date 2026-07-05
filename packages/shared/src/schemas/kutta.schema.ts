// user.schema.ts
import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  age: z.number().int().min(0).max(150).optional(),
  isActive: z.boolean().default(true),
  roles: z.array(z.enum(['admin', 'user', 'editor'])).default(['user']),
  createdAt: z.coerce.date(),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export type User = z.infer<typeof UserSchema>
