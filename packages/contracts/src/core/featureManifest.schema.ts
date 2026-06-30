import { z } from 'zod'

//  G-002: FeatureManifest Contract
// Defines the strict requirements for any feature loaded into the Novus platform.

export const featureManifestSchema = z.object({
  id: z.string().uuid().describe('The unique UUIDv4 identifier for this feature.'),
  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/, 'Version must follow semantic versioning (x.y.z)')
    .describe('The semantic version of the feature.'),
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be under 50 characters')
    .describe('The human-readable name of the feature.'),
  description: z
    .string()
    .max(255)
    .optional()
    .describe('An optional brief description of what the feature does.'),
  entryPoint: z
    .string()
    .endsWith('.js', 'Entry point must be a compiled JavaScript file')
    .describe('The relative path to the execution entry point.'),
  capabilities: z
    .array(z.string())
    .default([])
    .describe('A list of requested CapabilityIDs required by this feature.'),
})

// Automatically infer the strict TypeScript interface from the Zod schema
export type FeatureManifest = z.infer<typeof featureManifestSchema>
