import { zodToJsonSchema } from 'zod-to-json-schema'

import { CapabilityTokenSchema } from './capabilityToken.schema'

export const CapabilityTokenJsonSchema = zodToJsonSchema(CapabilityTokenSchema, {
  name: 'CapabilityToken',
})
