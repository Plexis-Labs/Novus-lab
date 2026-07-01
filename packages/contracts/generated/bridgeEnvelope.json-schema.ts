import { zodToJsonSchema } from 'zod-to-json-schema'

import { BridgeEnvelopeSchema } from '../src/bridge/bridgeEnvelope.schema'

/**
 * Machine-readable representation of the
 * Novus Runtime Bridge protocol.
 *
 * Used by:
 * - AI Gateway
 * - Backend validation
 * - Documentation
 * - Future SDK generation
 */
export const BridgeEnvelopeJsonSchema = zodToJsonSchema(BridgeEnvelopeSchema, {
  name: 'BridgeEnvelope',
})

/**
 * TODO:
 * Generate all contract artifacts automatically
 * during the release pipeline.
 *
 * Future command:
 *
 * pnpm generate:contracts
 */
