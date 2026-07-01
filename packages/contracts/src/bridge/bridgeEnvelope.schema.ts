import { z } from 'zod'

import { BridgeErrorSchema } from './bridgeError.schema'
import { BridgeRequestSchema } from './bridgeRequest.schema'
import { BridgeResponseSchema } from './bridgeResponse.schema'

/**
 * The root wire protocol used by the Novus Runtime Bridge.
 *
 * Every message crossing the sandbox/runtime boundary
 * must successfully parse against this schema.
 *
 * This schema represents the complete transport protocol
 * for postMessage communication.
 */
export const BridgeEnvelopeSchema = z
  .discriminatedUnion('kind', [BridgeRequestSchema, BridgeResponseSchema, BridgeErrorSchema])
  .superRefine((message, ctx) => {
    if (
      (message.kind === 'request' || message.kind === 'response') &&
      !Object.prototype.hasOwnProperty.call(message, 'payload')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['payload'],
        message: 'payload is required',
      })
    }
  })
