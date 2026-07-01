import { zodToJsonSchema } from 'zod-to-json-schema'

import { FeatureLifecycleSchema } from '../src/lifecycle/featureLifecycle.schema'

export const FeatureLifecycleJsonSchema = zodToJsonSchema(FeatureLifecycleSchema, {
  name: 'FeatureLifecycle',
  target: 'jsonSchema7',
})
