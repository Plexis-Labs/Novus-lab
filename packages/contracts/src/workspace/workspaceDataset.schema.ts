import { z } from 'zod'
// G-007: Workspace Dataset Contract
// Defines the standardized payload for data extracted from a workspace.

export const workspaceDatasetSchema = z.object({
  version: z
    .string()
    .regex(/^\d+\.\d+\.\d+$/, 'Version must follow semantic versioning (x.y.z)')
    .describe('The schema version of this dataset.'),

  entity: z
    .string()
    .min(1, 'Entity name cannot be empty')
    .describe('The domain entity type this dataset represents (e.g., "users", "tickets").'),

  coverage: z
    .object({
      isComplete: z
        .boolean()
        .describe('Whether this dataset contains the full collection of records.'),
      totalCount: z.number().int().nonnegative().describe('The total number of records expected.'),
      extractedCount: z
        .number()
        .int()
        .nonnegative()
        .describe('The actual number of records included in this payload.'),
    })
    .refine((data) => data.extractedCount <= data.totalCount, {
      message: 'Extracted count cannot exceed total count',
      path: ['extractedCount'],
    }),

  metadata: z
    .record(z.unknown())
    .default({})
    .describe('Optional contextual metadata about the dataset extraction.'),

  records: z.array(z.record(z.unknown())).describe('The actual extracted data records.'),
})

export type WorkspaceDataset = z.infer<typeof workspaceDatasetSchema>
