import type {
  FeatureLifecycleBaseSchema,
  FeatureLifecycleSchema,
  FeatureStateSchema,
} from './featureLifecycle.schema'
import type { z } from 'zod'

/**
 * Runtime execution state of an AI-generated feature.
 */
export type FeatureState = z.infer<typeof FeatureStateSchema>

/**
 * Lifecycle object before cross-field state validation.
 *
 * Primarily useful for testing and future schema composition.
 */
export type FeatureLifecycleBase = z.infer<typeof FeatureLifecycleBaseSchema>

/**
 * Fully validated runtime lifecycle.
 */
export type FeatureLifecycle = z.infer<typeof FeatureLifecycleSchema>
