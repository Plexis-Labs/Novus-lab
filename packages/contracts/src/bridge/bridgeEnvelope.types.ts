import type { BridgeEnvelopeSchema } from './bridgeEnvelope.schema'
import type { BridgeErrorSchema } from './bridgeError.schema'
import type { BridgeHeaderSchema } from './bridgeHeader.schema'
import type { BridgeRequestSchema } from './bridgeRequest.schema'
import type { BridgeResponseSchema } from './bridgeResponse.schema'
import type { z } from 'zod'

/**
 * Shared bridge header.
 */
export type BridgeHeader = z.infer<typeof BridgeHeaderSchema>

/**
 * Sandbox → Runtime request.
 */
export type BridgeRequest = z.infer<typeof BridgeRequestSchema>

/**
 * Runtime → Sandbox success response.
 */
export type BridgeResponse = z.infer<typeof BridgeResponseSchema>

/**
 * Runtime → Sandbox error response.
 */
export type BridgeError = z.infer<typeof BridgeErrorSchema>

/**
 * Root bridge protocol message.
 */
export type BridgeEnvelope = z.infer<typeof BridgeEnvelopeSchema>
