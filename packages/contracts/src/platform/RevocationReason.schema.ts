import { z } from 'zod'

import { Sha256HashSchema } from '../primitives/hash.schema'
/* -------------------------------------------------------------------------- */
/*                           Revocation Reasons                               */
/* -------------------------------------------------------------------------- */

export const RevocationReasonSchema = z.enum([
  'security_compromise',
  'signature_invalid',
  'compiler_bug',
  'deprecated',
  'manual_block',
])

/* -------------------------------------------------------------------------- */
/*                            Revocation Entry                                */
/* -------------------------------------------------------------------------- */

/**
 * Immutable artifact revocation.
 *
 * Prevents the Runtime from executing
 * previously trusted bundles.
 */
export const RevocationEntrySchema = z
  .object({
    /**
     * Manifest hash of the revoked artifact.
     */
    manifestHash: Sha256HashSchema,

    /**
     * Why it was revoked.
     */
    reason: RevocationReasonSchema,

    /**
     * Unix timestamp.
     */
    revokedAt: z.number().int().positive(),

    /**
     * Human-readable explanation.
     */
    message: z.string().trim().min(1).max(500),
  })
  .strict()

/* -------------------------------------------------------------------------- */
/*                           Revocation Policy                                */
/* -------------------------------------------------------------------------- */

export const RevocationPolicySchema = z
  .object({
    revokedArtifacts: z.array(RevocationEntrySchema).default([]),
  })
  .strict()
