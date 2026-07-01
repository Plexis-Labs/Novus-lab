import type {
  DataRequirementsSchema,
  FeasibilitySchema,
  FeaturePlanBaseSchema,
  FeaturePlanSchema,
} from './featurePlan.schema'
import type { z } from 'zod'

/**
 * Planner estimates describing the workspace data
 * required before feature generation can begin.
 */
export type DataRequirements = z.infer<typeof DataRequirementsSchema>

/**
 * Planner feasibility assessment.
 *
 * TypeScript automatically narrows this union
 * based on the value of `status`.
 */
export type Feasibility = z.infer<typeof FeasibilitySchema>

/**
 * Planner output before cross-field validation.
 *
 * Primarily useful for testing and future schema
 * composition.
 */
export type FeaturePlanBase = z.infer<typeof FeaturePlanBaseSchema>

/**
 * Fully validated AI planner output.
 */
export type FeaturePlan = z.infer<typeof FeaturePlanSchema>
