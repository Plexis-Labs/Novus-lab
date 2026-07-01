import type { collectorSchema } from './collector.schema'
import type { z } from 'zod'

export type CollectorState = z.infer<typeof collectorSchema>
