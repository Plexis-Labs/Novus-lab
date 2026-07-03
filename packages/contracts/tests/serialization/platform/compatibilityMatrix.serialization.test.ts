import { expectSchemaToPass, jsonRoundTrip } from '@novus/shared/testing'
import { describe, expect, it } from 'vitest'

import { VALID_COMPATIBILITY_MATRIX } from '../../../fixtures/platform/golden/compatibilityMatrix.valid'
import { CompatibilityMatrixSchema } from '../../../src/platform/compatibilityMatrix.schema'

describe('CompatibilityMatrix serialization', () => {
  it('survives a JSON round-trip', () => {
    expectSchemaToPass(CompatibilityMatrixSchema, jsonRoundTrip(VALID_COMPATIBILITY_MATRIX))
  })

  it('preserves the compatibility matrix structure', () => {
    const serialized = jsonRoundTrip(VALID_COMPATIBILITY_MATRIX)

    expect(serialized).toStrictEqual(VALID_COMPATIBILITY_MATRIX)
  })

  it('preserves adapter ordering', () => {
    const serialized = jsonRoundTrip(VALID_COMPATIBILITY_MATRIX)

    expect(serialized.adapters).toStrictEqual(VALID_COMPATIBILITY_MATRIX.adapters)
  })

  it('preserves revocation ordering', () => {
    const serialized = jsonRoundTrip(VALID_COMPATIBILITY_MATRIX)

    expect(serialized.revocations).toStrictEqual(VALID_COMPATIBILITY_MATRIX.revocations)
  })
})
