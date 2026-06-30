import { z } from 'zod'

export const SelectedTextSchema = z
  .object({
    /**
     * Sanitized user-selected text.
     * Never contains raw HTML.
     */
    content: z.string().max(4000, 'Selected text must not exceed 4000 characters'),

    /**
     * Character count before truncation.
     */
    characterCount: z.number().int().nonnegative(),

    /**
     * Indicates whether the original
     * selection exceeded the maximum limit.
     */
    truncated: z.boolean(),

    /**
     * Stable content hash used for
     * deduplication and telemetry.
     */
    hash: z.string(),
  })
  .strict()

export const DatasetSummarySchema = z
  .object({
    /**
     * Dataset identifier.
     */
    id: z.string().uuid(),

    /**
     * Entity represented by this dataset.
     *
     * Example:
     * pull_request
     * issue
     * employee
     */
    entity: z.string(),

    /**
     * Number of collected records.
     */
    recordCount: z.number().int().nonnegative(),

    /**
     * Collection completeness.
     */
    completeness: z.enum(['complete', 'partial', 'unknown']),

    /**
     * ISO timestamp when the dataset
     * was last collected.
     */
    collectedAt: z.string().datetime(),
  })
  .strict()

export const AdapterStateSchema = z
  .object({
    /**
     * Adapter identifier.
     *
     * Example:
     * github-pr
     */
    id: z.string(),

    /**
     * Adapter semantic version.
     */
    version: z.string(),

    /**
     * Adapter maturity.
     */
    maturityLevel: z.enum(['L1', 'L2', 'L3', 'L4']),

    /**
     * Runtime health.
     */
    health: z.enum(['healthy', 'degraded', 'broken']),

    /**
     * Approved entities collected
     * by the adapter.
     *
     * TODO (Phase 3):
     * Replace with EntitySummarySchema.
     */
    approvedEntities: z.array(z.record(z.unknown())),

    /**
     * Current logical route.
     */
    routeKind: z.string(),
  })
  .strict()

export const DataPolicySchema = z
  .object({
    /**
     * Whether any off-device
     * transmission is permitted.
     */
    offDeviceAllowed: z.boolean(),

    /**
     * Whether selected text may
     * be included in the request.
     */
    selectedTextAllowed: z.boolean(),
  })
  .strict()

export const GenerationContextBaseSchema = z
  .object({
    /**
     * Unique client-generated request identifier.
     *
     * Used for idempotency. Prevents duplicate
     * generations when requests are retried.
     */
    clientRequestId: z.string().uuid(),

    /**
     * Natural language instruction provided
     * by the user.
     */
    prompt: z
      .string()
      .min(1, 'Prompt cannot be empty.')
      .max(800, 'Prompt must not exceed 800 characters.'),

    /**
     * Current workspace adapter state.
     */
    adapter: AdapterStateSchema,

    /**
     * Capabilities available to the generated
     * Workspace Product.
     *

      * TODO:
      * Replace string[] with CapabilityDescriptorSchema
      * after the shared capability contract is introduced.
    */
    availableCapabilities: z.array(z.string()).default([]),

    /**
     * UI surfaces where generated widgets
     * may be mounted.
     */
    allowedSurfaces: z.array(z.enum(['side_panel', 'overlay', 'annotation'])).default([]),

    /**
     * Metadata describing datasets currently
     * available inside the workspace.
     */
    existingDatasets: z.array(DatasetSummarySchema).default([]),

    /**
     * Privacy policy controlling what
     * information may leave the device.
     */
    dataPolicy: DataPolicySchema,

    /**
     * Optional sanitized user selection.
     *
     * Presence is controlled by
     * DataPolicy.selectedTextAllowed.
     */
    selectedText: SelectedTextSchema.optional(),

    /**
     * Prompt template version.
     *
     * Used to guarantee deterministic
     * AI behavior across releases.
     */
    promptVersion: z.string(),

    /**
     * Requested generation strategy.
     */
    generationMode: z.enum(['trusted_spec', 'generated_bundle']),
  })
  .strict()

export const GenerationContextSchema = GenerationContextBaseSchema.superRefine(
  (context, refinementContext) => {
    if (!context.dataPolicy.selectedTextAllowed && context.selectedText !== undefined) {
      refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['selectedText'],
        message: 'selectedText must be undefined when selectedTextAllowed is false.',
      })
    }
    /**
     * TODO:
     * Decide whether offDeviceAllowed=false
     * should invalidate the entire context or
     * simply prevent transmission at Runtime.
     */
    //     if (!context.dataPolicy.offDeviceAllowed) {
    //   refinementContext.addIssue({
    //     code: z.ZodIssueCode.custom,
    //     path: ["dataPolicy", "offDeviceAllowed"],
    //     message:
    //       "GenerationContext cannot be created when off-device transmission is disabled.",
    //   });
    // }
  },
)
