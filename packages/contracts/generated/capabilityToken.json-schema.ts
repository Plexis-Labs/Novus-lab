import { zodToJsonSchema } from 'zod-to-json-schema'

import { CapabilityTokenSchema } from '../src/security/capabilityToken.schema'

/**
 * TODO:
 * Publish generated JSON Schemas as versioned artifacts
 * for external runtimes and SDK consumers.
 */
export const CapabilityTokenJsonSchema = zodToJsonSchema(CapabilityTokenSchema, {
  name: 'CapabilityToken',
})
