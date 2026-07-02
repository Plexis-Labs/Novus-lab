/* -------------------------------------------------------------------------- */
/*                         Adapter Compatibility                              */
/* -------------------------------------------------------------------------- */

import { z } from 'zod'

import { AdapterVersionSchema, SupportedAdapterRangeSchema } from '../primitives'

/**
 * Compatibility requirements for a single adapter.
 *
 * This schema describes which versions of an adapter
 * are supported by the current Runtime release.
 *
 * It intentionally does not describe the adapter itself.
 */
export const AdapterCompatibilityBaseSchema = z
  .object({
    /**
     * Stable adapter identifier.
     *
     * Examples:
     * - github-pr
     * - linear
     * - jira
     */
    adapterId: z.string().trim().min(1).max(100),

    /**
     * Current adapter release.
     */
    version: AdapterVersionSchema,

    /**
     * Supported adapter versions.
     *
     * Example:
     * ^2.1.0
     */
    supportedVersions: SupportedAdapterRangeSchema,

    /**
     * Whether the adapter is deprecated.
     */
    deprecated: z.boolean().default(false),

    /**
     * Version in which deprecation began.
     *
     * Present only when deprecated.
     */
    deprecatedSince: AdapterVersionSchema.optional(),
  })
  .strict()

export const AdapterCompatibilitySchema = AdapterCompatibilityBaseSchema.superRefine(
  (adapter, ctx) => {
    if (adapter.deprecated && adapter.deprecatedSince === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['deprecatedSince'],
        message: 'deprecatedSince is required when an adapter is deprecated.',
      })
    }

    if (!adapter.deprecated && adapter.deprecatedSince !== undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['deprecatedSince'],
        message: 'deprecatedSince must not be provided for active adapters.',
      })
    }
  },
)
