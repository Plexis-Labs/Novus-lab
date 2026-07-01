import { z } from 'zod'

export const siteWorkspaceAdapterSchema = z.object({
  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/)
    .describe('Semantic version of the adapter.'),

  health: z
    .enum(['healthy', 'degraded', 'offline'])
    .describe('Current operational status of the target site.'),

  entities: z
    .array(z.string())
    .min(1)
    .describe('List of domain entities (e.g., "users", "tickets") this adapter can extract.'),

  capabilities: z.array(z.string()).describe('List of supported capability IDs.'),

  routes: z.array(z.string()).describe('List of route patterns this adapter binds to.'),

  collectors: z.array(z.string()).describe('List of registered data collectors.'),
})

export type SiteWorkspaceAdapter = z.infer<typeof siteWorkspaceAdapterSchema>
