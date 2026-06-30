import { zodToJsonSchema } from 'zod-to-json-schema'

import { GenerationContextSchema } from '../src/ai/generationContext.schema'

/**
 * JSON Schema representation of the GenerationContext contract.
 *
 * Used by:
 * - AI Gateway
 * - Backend validation
 * - Documentation
 * - Future SDKs
 */
export const GenerationContextJsonSchema = zodToJsonSchema(GenerationContextSchema, {
  name: 'GenerationContext',
})
