import { z } from 'zod'

import { BridgeHeaderSchema } from './bridgeHeader.schema'

/**
 * Canonical bridge-level error codes.
 *
 * These represent transport/runtime failures,
 * not business-domain errors.
 */
export const BridgeErrorCodeSchema = z.enum([
  'UNAUTHORIZED',
  'VALIDATION_FAILED',
  'TIMEOUT',
  'NOT_FOUND',
  'METHOD_NOT_SUPPORTED',
  'INTERNAL_ERROR',
])

/**
 * Safe error payload returned to the sandbox.
 *
 * Never expose stack traces or internal runtime objects.
 */
export const BridgeErrorObjectSchema = z
  .object({
    /**
     * Machine-readable error code.
     */
    code: BridgeErrorCodeSchema,

    /**
     * Human-readable explanation.
     */
    message: z.string(),

    /**
     * Optional structured debugging information.
     *
     * Must never contain secrets.
     */
    details: z.unknown().optional(),
  })
  .strict()

export const BridgeErrorSchema = z
  .object({
    kind: z.literal('error'),

    header: BridgeHeaderSchema,

    error: BridgeErrorObjectSchema,
  })
  .strict()
