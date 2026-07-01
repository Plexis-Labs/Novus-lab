import { zodToJsonSchema } from 'zod-to-json-schema'

import { datasetProvenanceSchema } from '../src/workspace/datasetProvenance.schema'

export const datasetProvenanceJsonSchema = zodToJsonSchema(
  datasetProvenanceSchema,
  'DatasetProvenance',
)
