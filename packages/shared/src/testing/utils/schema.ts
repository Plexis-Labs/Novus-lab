import { expect } from 'vitest'

import type { ZodType } from 'zod'
/**
 * Asserts that a given payload successfully passes Zod schema validation.
 */

export function expectSchemaToPass<T>(schema: ZodType<T>, value: unknown): void {
  expect(() => {
    schema.parse(value)
  }).not.toThrow()
}

export function expectSchemaToFail<T>(schema: ZodType<T>, value: unknown): void {
  expect(() => {
    schema.parse(value)
  }).toThrow()
}
