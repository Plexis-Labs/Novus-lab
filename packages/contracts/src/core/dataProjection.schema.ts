import { z } from 'zod'

export const dataProjectionSchema = z.object({
  projection: z
    .object({
      mode: z
        .enum(['strict', 'flexible'])
        .describe('Strict drops unmapped fields; flexible retains them.'),
    })
    .describe('General projection behavior.'),

  normalization: z
    .object({
      casing: z
        .enum(['camelCase', 'snake_case', 'preserve'])
        .default('preserve')
        .describe('Target casing for object keys.'),
      trimStrings: z
        .boolean()
        .default(true)
        .describe('Whether to trim leading/trailing whitespace from string values.'),
    })
    .describe('Data normalization rules applied post-extraction.'),

  allowedFields: z
    .array(z.string())
    .describe('Explicit list of JSON paths permitted in the final output.'),

  forbiddenFields: z
    .array(z.string())
    .describe('Explicit list of JSON paths stripped from the output (e.g., PII, internals).'),
})
