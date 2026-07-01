import { z } from 'zod'

export const collectorSchema = z.object({
  pagination: z
    .object({
      cursor: z.string().optional().describe('Opaque token for the next page of results.'),
      limit: z
        .number()
        .int()
        .positive()
        .default(50)
        .describe('Maximum number of records per batch.'),
      hasNextPage: z.boolean().describe('Indicates if more records exist.'),
    })
    .describe('Pagination state for the collection run.'),

  progress: z
    .object({
      recordsProcessed: z
        .number()
        .int()
        .nonnegative()
        .describe('Total number of records extracted so far.'),
      status: z
        .enum(['running', 'paused', 'completed', 'failed'])
        .describe('Current execution state.'),
    })
    .describe('Real-time progress metrics.'),

  cancellation: z
    .object({
      requestedAt: z.string().datetime().describe('ISO-8601 timestamp of cancellation request.'),
      reason: z.string().describe('Reason provided for halting collection.'),
    })
    .optional()
    .describe('Cancellation payload, present only if a halt was requested.'),

  coverage: z
    .number()
    .min(0)
    .max(100)
    .describe('Estimated percentage of the total dataset extracted.'),
})
