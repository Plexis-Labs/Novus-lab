import { z } from 'zod'

/**
 * TODO:
 *
 * Replace capability strings with the generated
 * Capability Registry once available.
 *
 * Replace sitePattern validation with the
 * Novus Match Pattern parser.
 *
 * Validate partial approvals against the
 * Runtime Capability Registry.
 */

/**
 * Defines where an approved feature is allowed to execute.
 *
 * The scope determines the boundary within which a
 * PermissionGrant remains valid.
 */
export const PermissionScopeSchema = z.enum(['per_url', 'per_site', 'global'])

/**
 * Represents the current lifecycle state of a user's
 * permission decision.
 */
export const PermissionStatusSchema = z.enum(['granted', 'denied', 'revoked'])

/**
 * Immutable record of a user's permission decision.
 *
 * Stored in chrome.storage.local and used by the
 * Capability Engine when determining whether a
 * CapabilityToken may be issued.
 */
export const PermissionGrantBaseSchema = z
  .object({
    /**
     * Unique identifier for this permission grant.
     */
    grantId: z.string().uuid(),

    /**
     * Identity of the requesting feature.
     */
    featureId: z.string().uuid(),

    /**
     * Exact version approved by the user.
     *
     * Prevents permission reuse across
     * different feature revisions.
     */
    featureVersion: z.number().int().positive(),

    /**
     * Capabilities originally requested
     * by the generated feature.
     */
    requestedCapabilities: z.array(z.string()).min(1, 'At least one capability must be requested'),

    /**
     * Capabilities actually approved
     * by the user.
     *
     * May become a subset of the requested
     * capabilities when partial approvals
     * are introduced.
     */
    approvedCapabilities: z.array(z.string()),

    /**
     * Execution boundary.
     */
    scope: PermissionScopeSchema,

    /**
     * URL match pattern defining where
     * this permission applies.
     *
     * Examples:
     *
     * github.com/*
     * https://example.com/page
     * *
     */
    sitePattern: z.string().min(1, 'Site pattern cannot be empty'),

    /**
     * Current permission lifecycle state.
     */
    status: PermissionStatusSchema,

    /**
     * Unix timestamp (milliseconds)
     * recording when the user granted
     * or denied the request.
     */
    grantedAt: z.number().int().positive(),

    /**
     * Populated only after the user
     * explicitly revokes a grant.
     */
    revokedAt: z.number().int().positive().optional(),
  })
  .strict()

/**
 * Immutable permission ledger entry.
 *
 * Cross-field invariants are enforced here to ensure
 * that impossible permission states can never be persisted.
 */
export const PermissionGrantSchema = PermissionGrantBaseSchema.superRefine((grant, ctx) => {
  /**
   * Revoked permissions must record when they
   * were revoked.
   */
  if (grant.status === 'revoked' && grant.revokedAt === undefined) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['revokedAt'],
      message: "revokedAt is required when status is 'revoked'.",
    })
  }

  /**
   * Denied permissions cannot possess
   * approved capabilities.
   */
  if (grant.status === 'denied' && grant.approvedCapabilities.length > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['approvedCapabilities'],
      message: "approvedCapabilities must be empty when status is 'denied'.",
    })
  }

  /**
   * Approved capabilities must always be a subset
   * of the originally requested capabilities.
   */
  const requested = new Set(grant.requestedCapabilities)

  const invalidCapabilities = grant.approvedCapabilities.filter(
    (capability) => !requested.has(capability),
  )

  if (invalidCapabilities.length > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['approvedCapabilities'],
      message: 'approvedCapabilities must be a subset of requestedCapabilities.',
    })
  }

  /**
   * Revocation cannot occur before the
   * original grant.
   */
  if (grant.revokedAt !== undefined && grant.revokedAt < grant.grantedAt) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['revokedAt'],
      message: 'revokedAt cannot occur before grantedAt.',
    })
  }
})
