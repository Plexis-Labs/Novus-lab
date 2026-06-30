// capabilityToken.types.ts

import type { CapabilityTokenSchema, InstanceBindingSchema } from './capabilityToken.schema'
import type { z } from 'zod'

export type InstanceBinding = z.infer<typeof InstanceBindingSchema>

export type CapabilityToken = z.infer<typeof CapabilityTokenSchema>
