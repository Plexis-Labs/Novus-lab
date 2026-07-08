import type { RuntimeHealthSchema, RuntimeStatusSchema } from './runtimeHealth.schema'
import type { z } from 'zod'

// Optional: Extract the TypeScript types back from the schemas
export type RuntimeStatus = z.infer<typeof RuntimeStatusSchema>
export type RuntimeHealth = z.infer<typeof RuntimeHealthSchema>
