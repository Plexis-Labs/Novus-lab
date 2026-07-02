import { z } from 'zod'

import { AdapterVersionSchema } from '../primitives/version.schema'

export const siteWorkspaceAdapterSchema = z.object({
  version: AdapterVersionSchema,

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
