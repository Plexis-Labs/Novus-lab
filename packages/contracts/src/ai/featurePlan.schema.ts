import { z } from 'zod'

/**
 * Describes the workspace data required by the AI planner
 * before feature generation may begin.
 *
 * These values are planning estimates rather than runtime
 * guarantees and help determine collection strategy.
 */
export const DataRequirementsSchema = z
  .object({
    /**
     * Indicates whether additional workspace collection
     * is required before generation.
     */
    needsCollection: z.boolean(),

    /**
     * Indicates whether the planner requires the entire
     * dataset instead of a partial sample.
     */
    needsCompleteDataset: z.boolean(),

    /**
     * Indicates whether feature generation may continue
     * with incomplete workspace data.
     */
    partialDataAllowed: z.boolean(),

    /**
     * Estimated number of pages the adapter may need to
     * collect.
     *
     * Present only when collection is required.
     */
    estimatedPages: z.number().int().positive().optional(),

    /**
     * Estimated number of records expected after
     * collection completes.
     *
     * Present only when collection is required.
     */
    estimatedRecords: z.number().int().positive().optional(),
  })
  .strict()

/**
 * Planner feasibility assessment.
 *
 * The planner must explicitly declare whether the
 * requested feature can be generated completely,
 * partially, or not at all.
 */
export const FeasibilitySchema = z.discriminatedUnion('status', [
  z
    .object({
      /**
       * The requested feature can be generated
       * without limitations.
       */
      status: z.literal('feasible'),
    })
    .strict(),

  z
    .object({
      /**
       * The requested feature can be generated
       * with reduced functionality.
       */
      status: z.literal('partial'),

      /**
       * Human-readable explanation describing
       * which functionality cannot be provided.
       */
      limitations: z.array(z.string().min(1)).min(1),
    })
    .strict(),

  z
    .object({
      /**
       * The requested feature cannot be generated.
       */
      status: z.literal('infeasible'),

      /**
       * Human-readable explanation describing
       * why generation cannot continue.
       */
      reason: z.string().min(5, 'Infeasible plans must explain why generation cannot continue.'),
    })
    .strict(),
])

/**
 * Canonical AI planner output.
 *
 * The Feature Plan represents the planner's understanding
 * of the user's request after analyzing the GenerationContext.
 *
 * No UI generation begins until a valid FeaturePlan exists.
 */
export const FeaturePlanBaseSchema = z
  .object({
    /**
     * Natural-language summary describing the
     * user's requested feature.
     */
    intent: z
      .string()
      .min(1, 'Intent cannot be empty.')
      .max(500, 'Intent must not exceed 500 characters.'),

    /**
     * Human-readable feature title.
     */
    featureName: z.string().min(1).max(80, 'Feature name must not exceed 80 characters.'),

    /**
     * Workspace entities required by
     * the generated feature.
     */
    requiredEntities: z.array(z.string().min(1)),

    /**
     * Runtime capabilities that must
     * be approved before execution.
     */
    requestedCapabilities: z.array(z.string().min(1)),

    /**
     * Planner estimate describing
     * workspace collection requirements.
     */
    dataRequirements: DataRequirementsSchema,

    /**
     * Overall planner feasibility.
     */
    feasibility: FeasibilitySchema,

    /**
     * Determines which generation
     * pipeline should execute.
     */
    generationMode: z.enum(['trusted_spec', 'generated_bundle']),

    /**
     * Planner contract version.
     */
    plannerVersion: z.string().min(1),

    /**
     * Planner model identifier.
     *
     * Example:
     * GPT-5.5
     * Claude Sonnet 4
     */
    plannerModel: z.string().min(1),
  })
  .strict()

/**
 * Fully validated planner output.
 *
 * Cross-field invariants ensure that planner decisions
 * remain internally consistent before generation begins.
 */
export const FeaturePlanSchema = FeaturePlanBaseSchema.superRefine((plan, ctx) => {
  const { needsCollection, needsCompleteDataset, estimatedPages, estimatedRecords } =
    plan.dataRequirements

  /**
   * A complete dataset cannot exist without
   * first performing collection.
   */
  if (needsCompleteDataset && !needsCollection) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['dataRequirements', 'needsCompleteDataset'],
      message: 'needsCompleteDataset requires needsCollection to be true.',
    })
  }

  /**
   * Estimated collection metadata is only valid
   * when collection is actually required.
   */
  if (!needsCollection && estimatedPages !== undefined) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['dataRequirements', 'estimatedPages'],
      message: 'estimatedPages may only be provided when needsCollection is true.',
    })
  }

  if (!needsCollection && estimatedRecords !== undefined) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['dataRequirements', 'estimatedRecords'],
      message: 'estimatedRecords may only be provided when needsCollection is true.',
    })
  }

  /**
   * Collection estimates should be supplied
   * whenever collection is required.
   *
   * These estimates allow the runtime to
   * anticipate collection cost.
   */
  if (needsCollection) {
    if (estimatedPages === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['dataRequirements', 'estimatedPages'],
        message: 'estimatedPages is required when needsCollection is true.',
      })
    }

    if (estimatedRecords === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['dataRequirements', 'estimatedRecords'],
        message: 'estimatedRecords is required when needsCollection is true.',
      })
    }
  }
  if (needsCompleteDataset && plan.dataRequirements.partialDataAllowed) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['dataRequirements', 'partialDataAllowed'],
      message: 'partialDataAllowed must be false when needsCompleteDataset is true.',
    })
  }
})
