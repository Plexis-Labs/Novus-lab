import { z } from 'zod'

import { BridgeHeaderSchema } from './bridgeHeader.schema'

/**
 * Successful runtime response.
 */
export const BridgeResponseSchema = z
  .object({
    /**
     * Message discriminator.
     */
    kind: z.literal('response'),

    /**
     * Common routing metadata.
     */
    header: BridgeHeaderSchema,

    /**
     * Handler result.
     *
     * Validation belongs to the caller,
     * not the transport layer.
     */
    payload: z.unknown(),
  })
  .strict()
