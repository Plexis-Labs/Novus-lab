import { zodToJsonSchema } from 'zod-to-json-schema'

import { FeaturePlanSchema } from '../src/ai/featurePlan.schema'

/**
 * JSON Schema representation of the AI Planner contract.
 *
 * This schema is intended to be injected directly into
 * planner prompts to enforce structured output.
 */
export const FeaturePlanJsonSchema = zodToJsonSchema(FeaturePlanSchema, {
  name: 'FeaturePlan',
  target: 'jsonSchema7',
})
