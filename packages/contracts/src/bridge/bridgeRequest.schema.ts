import { z } from 'zod'

import { BridgeHeaderSchema } from './bridgeHeader.schema'
import { CapabilityTokenSchema } from '../security/capabilityToken.schema'

/**
 * Fully-qualified runtime method identifier.
 *
 * Examples:
 *  - Novus.workspace.query
 *  - Novus.notes.create
 *  - Novus.ai.generate
 */

/**
 * TODO:
 * Replace the regex with a generated MethodRegistrySchema
 * once the Runtime Registry is implemented.
 *
 * Future:
 *   Novus.workspace.query
 *   Novus.notes.create
 *   ...
 * will be generated automatically from the runtime registry.
 */
export const BridgeMethodSchema = z
  .string()
  .min(1)
  .regex(/^Novus(?:\.[A-Za-z][A-Za-z0-9]*)+$/, 'Method must be a fully-qualified Novus RPC method.')

/**
 * Sandbox → Runtime RPC request.
 *
 * Every privileged operation begins with this envelope.
 */
export const BridgeRequestSchema = z
  .object({
    /**
     * Message discriminator.
     */
    kind: z.literal('request'),

    /**
     * Common routing metadata.
     */
    header: BridgeHeaderSchema,

    /**
     * Authorization proof.
     *
     * Verified by the Runtime before dispatch.
     */
    capabilityToken: CapabilityTokenSchema,

    /**
     * Runtime RPC method.
     */
    method: BridgeMethodSchema,

    /**
     * Method-specific payload.
     *
     * This remains unknown because every handler
     * owns validation of its own payload.
     */
    payload: z.unknown(),
  })
  .strict()
