import { z } from 'zod'

/**
 * Runtime execution state of an AI-generated feature.
 *
 * The lifecycle drives the Runtime Scheduler and determines
 * whether a feature may collect data, request permissions,
 * mount its sandbox, or execute normally.
 */
export const FeatureStateSchema = z.enum([
  /**
   * Feature is disabled and cannot execute.
   */
  'DISABLED',

  /**
   * Waiting for the user to navigate to a supported site.
   */
  'WAITING_FOR_SITE',

  /**
   * Waiting for prerequisite workspace data before collection
   * may begin.
   */
  'WAITING_FOR_DATA',

  /**
   * Waiting for explicit user approval before privileged
   * execution may continue.
   */
  'WAITING_FOR_APPROVAL',

  /**
   * Adapter is actively collecting workspace data.
   */
  'COLLECTING',

  /**
   * All prerequisites have completed and the feature is ready
   * to begin mounting.
   */
  'READY_TO_MOUNT',

  /**
   * Sandbox creation and application initialization
   * are currently in progress.
   */
  'MOUNTING',

  /**
   * Feature is fully operational.
   */
  'ACTIVE',

  /**
   * Feature remains operational but with reduced
   * functionality.
   */
  'DEGRADED',

  /**
   * Feature encountered a fatal runtime error.
   */
  'ERROR',
])

/**
 * Persistent runtime state for an AI-generated feature.
 *
 * The runtime scheduler restores this object during
 * startup to determine where feature execution should
 * resume.
 */
export const FeatureLifecycleBaseSchema = z
  .object({
    /**
     * Identity of the generated feature.
     */
    featureId: z.string().uuid(),

    /**
     * Exact feature revision.
     *
     * Prevents runtime state from leaking across
     * incompatible feature versions.
     */
    featureVersion: z.number().int().positive(),

    /**
     * Current runtime execution state.
     */
    currentState: FeatureStateSchema,

    /**
     * Unix timestamp (milliseconds) indicating when
     * the feature last entered its current state.
     */
    lastTransitionedAt: z.number().int().positive(),

    /**
     * Human-readable explanation describing why
     * the feature is operating in degraded mode.
     */
    degradedReason: z.string().min(1).optional(),

    /**
     * Stable runtime error identifier.
     */
    errorCode: z.string().min(1).optional(),

    /**
     * Human-readable runtime error message.
     */
    errorMessage: z.string().min(1).optional(),

    /**
     * Number of successful mount operations performed
     * by this feature.
     *
     * Used for telemetry and runtime diagnostics.
     */
    mountCount: z.number().int().nonnegative().default(0),
  })
  .strict()

/**
 * TODO:
 *
 * Replace errorCode with the generated Runtime Error Registry.
 *
 * Validate lifecycle transitions inside the Runtime Scheduler.
 *
 * Add timeout recovery rules once lifecycle recovery exists.
 */

/**
 * Fully validated runtime lifecycle.
 *
 * Cross-field invariants guarantee that every persisted
 * runtime state contains enough diagnostic information
 * for deterministic recovery and debugging.
 */
export const FeatureLifecycleSchema = FeatureLifecycleBaseSchema.superRefine((lifecycle, ctx) => {
  /**
   * Fatal runtime failures must include complete
   * diagnostic information.
   */
  if (lifecycle.currentState === 'ERROR') {
    if (!lifecycle.errorCode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['errorCode'],
        message: "errorCode is required when currentState is 'ERROR'.",
      })
    }

    if (!lifecycle.errorMessage) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['errorMessage'],
        message: "errorMessage is required when currentState is 'ERROR'.",
      })
    }
  }

  /**
   * Degraded execution must explain why
   * reduced functionality is occurring.
   */
  if (lifecycle.currentState === 'DEGRADED' && !lifecycle.degradedReason) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['degradedReason'],
      message: "degradedReason is required when currentState is 'DEGRADED'.",
    })
  }

  /**
   * A feature cannot report degraded and fatal
   * diagnostics simultaneously.
   */
  if (lifecycle.currentState === 'ERROR' && lifecycle.degradedReason !== undefined) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['degradedReason'],
      message: "degradedReason must be undefined when currentState is 'ERROR'.",
    })
  }

  /**
   * Non-error states should not carry stale
   * runtime error information.
   */
  if (
    lifecycle.currentState !== 'ERROR' &&
    (lifecycle.errorCode !== undefined || lifecycle.errorMessage !== undefined)
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['errorCode'],
      message: 'Runtime error diagnostics are only valid in the ERROR state.',
    })
  }
})
