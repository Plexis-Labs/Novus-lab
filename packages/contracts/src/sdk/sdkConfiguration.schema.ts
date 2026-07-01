import { z } from 'zod'

export const sdkConfigurationSchema = z.object({
  workspace: z.object({
    enabled: z.boolean().describe('Grants access to Novus.workspace()'),
    mode: z.enum(['read', 'read-write']).default('read').describe('Level of workspace access.'),
  }),

  query: z.object({
    enabled: z.boolean().describe('Grants access to Novus.query()'),
    maxLimit: z.number().int().positive().default(100).describe('Max records per query.'),
  }),

  storage: z.object({
    enabled: z.boolean().describe('Grants access to Novus.storage()'),
    quotaMb: z.number().int().nonnegative().describe('Maximum storage allocation in MB.'),
  }),

  annotations: z.object({
    enabled: z.boolean().describe('Grants access to Novus.annotations()'),
  }),

  router: z.object({
    enabled: z.boolean().describe('Grants access to Novus.router()'),
    allowedHosts: z.array(z.string()).describe('List of external hosts the router can bridge to.'),
  }),

  feature: z.object({
    enabled: z.boolean().describe('Grants access to Novus.feature() for bundle introspection.'),
  }),

  permissions: z.object({
    enabled: z.boolean().describe('Grants access to Novus.permissions()'),
    elevated: z
      .boolean()
      .default(false)
      .describe('Whether the SDK is running in an elevated admin context.'),
  }),
})
