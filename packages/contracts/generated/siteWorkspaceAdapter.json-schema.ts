import { zodToJsonSchema } from 'zod-to-json-schema'

import { siteWorkspaceAdapterSchema } from '../src/adapter/siteWorkspaceAdapter.schema'

export const siteWorkspaceAdapterJsonSchema = zodToJsonSchema(
  siteWorkspaceAdapterSchema,
  'SiteWorkspaceAdapter',
)
