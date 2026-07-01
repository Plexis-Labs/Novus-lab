import type { datasetProvenanceSchema } from './datasetProvenance.schema'
import type { z } from 'zod'

export type DatasetProvenance = z.infer<typeof datasetProvenanceSchema>
