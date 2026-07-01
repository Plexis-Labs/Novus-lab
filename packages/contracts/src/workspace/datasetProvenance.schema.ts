import { z } from 'zod'

export const datasetProvenanceSchema = z.object({
  collectionMode: z
    .enum(['manual', 'automated', 'hybrid'])
    .describe('The operational mode used to collect this dataset.'),

  adapterVersion: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/)
    .describe('Semantic version of the adapter that extracted the data.'),

  source: z.string().url().describe('The origin URL or unique identifier of the target workspace.'),

  warnings: z
    .array(z.string())
    .default([])
    .describe(
      'Any non-fatal validation warnings or dropped field alerts generated during collection.',
    ),

  timestamp: z
    .string()
    .datetime()
    .describe('ISO-8601 timestamp indicating exactly when the dataset was collected.'),
})
