import { VALID_COMPATIBILITY_MATRIX } from '../../fixtures/platform/golden/compatibilityMatrix.valid'

import type { CompatibilityMatrix } from '../../src/platform/compatibilityMatrix.types'

/**
 * Creates a mutable Compatibility Matrix fixture.
 *
 * Every invocation returns a fresh deep copy,
 * allowing tests to safely mutate nested objects
 * without affecting subsequent test cases.
 */
export function createCompatibilityMatrixFixture(): CompatibilityMatrix {
  return structuredClone(VALID_COMPATIBILITY_MATRIX)
}
