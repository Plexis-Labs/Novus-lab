import { zodToJsonSchema } from 'zod-to-json-schema'

import { MicroAppSpecSchema } from '../src/ai/microAppSpec.schema'

/**
 * JSON Schema representation of the trusted
 * MicroApp specification.
 *
 * This schema is injected directly into the
 * planner prompt to constrain Structured Output.
 */
export const MicroAppSpecJsonSchema = zodToJsonSchema(MicroAppSpecSchema, {
  name: 'MicroAppSpec',
  target: 'jsonSchema7',
})
