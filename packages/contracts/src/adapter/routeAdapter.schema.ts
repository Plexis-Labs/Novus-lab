import { z } from 'zod'

import { AdapterVersionSchema } from '../primitives/version.schema'

export const routeAdapterSchema = z.object({
  version: AdapterVersionSchema,

  match: z
    .object({
      patterns: z.array(z.string()).describe('URL or path patterns this adapter handles.'),
      exact: z.boolean().default(false).describe('Whether the match must be exact.'),
    })
    .describe('Rules for when this adapter should activate.'),

  extract: z
    .object({
      selectors: z.record(z.string()).describe('DOM selectors to extract data from the page.'),
      required: z
        .array(z.string())
        .describe('Keys that must be found for a successful extraction.'),
    })
    .describe('Configuration for extracting data from the matched route.'),

  observe: z
    .object({
      mutations: z.boolean().describe('Whether to observe DOM mutations on this route.'),
      events: z
        .array(z.string())
        .describe('Specific DOM events to listen to (e.g., "click", "scroll").'),
    })
    .describe('Runtime observation requirements.'),

  unmount: z
    .object({
      cleanup: z
        .boolean()
        .describe('Whether a specific cleanup routine is required on route exit.'),
    })
    .describe('Teardown requirements when leaving the route.'),
})
