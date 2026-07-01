import type { dataProjectionSchema } from './dataProjection.schema'
import type { z } from 'zod'

export type DataProjection = z.infer<typeof dataProjectionSchema>
