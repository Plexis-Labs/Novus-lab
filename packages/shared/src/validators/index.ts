import { z } from 'zod'

// Shared Primitive Validators
export const UUIDSchema = z.string().uuid().describe('A universally unique identifier')
export const TimestampSchema = z
  .number()
  .int()
  .positive()
  .describe('Unix timestamp in milliseconds')
export const VersionSchema = z
  .string()
  .regex(/^\d+\.\d+\.\d+$/)
  .describe('Semantic version string')

// Common Enums
export const EnvironmentEnum = z.enum(['development', 'staging', 'production'])
export const GateStatusEnum = z.enum(['idle', 'ok', 'fail'])

// Base Schema for all platform contracts
export const BaseSchema = z.object({
  id: UUIDSchema,
  createdAt: TimestampSchema,
  updatedAt: TimestampSchema,
  version: VersionSchema,
})

export type BaseContract = z.infer<typeof BaseSchema>
