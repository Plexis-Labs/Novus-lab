import type { GenerationContextSchema } from './generationContext.schema'
import type { z } from 'zod'

export type GenerationContext = z.infer<typeof GenerationContextSchema>
