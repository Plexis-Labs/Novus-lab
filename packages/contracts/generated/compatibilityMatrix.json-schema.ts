import { zodToJsonSchema } from 'zod-to-json-schema'

import { CompatibilityMatrixSchema } from '../src/platform/compatibilityMatrix.schema'

export const CompatibilityMatrixJsonSchema = zodToJsonSchema(CompatibilityMatrixSchema, {
  name: 'CompatibilityMatrix',
})
