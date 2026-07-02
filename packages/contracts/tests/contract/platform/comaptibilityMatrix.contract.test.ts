import {
  asUnknown,
  expectSchemaToFail,
  expectSchemaToPass,
  jsonRoundTrip,
} from '@novus/shared/testing'
import { describe, it } from 'vitest'

import { VALID_COMPATIBILITY_MATRIX } from '../../../fixtures/platform/golden/compatibilityMatrix.valid'
import { INVALID_COMPATIBILITY_MATRIX } from '../../../fixtures/platform/invalid/compatibilityMatrix.invalid'
import { CompatibilityMatrixSchema } from '../../../src/platform/compatibilityMatrix.schema'

describe('CompatibilityMatrixSchema', () => {
  describe('contract', () => {
    it('accepts the canonical compatibility matrix', () => {
      expectSchemaToPass(CompatibilityMatrixSchema, jsonRoundTrip(VALID_COMPATIBILITY_MATRIX))
    })

    it('rejects the canonical invalid compatibility matrix', () => {
      expectSchemaToFail(CompatibilityMatrixSchema, jsonRoundTrip(INVALID_COMPATIBILITY_MATRIX))
    })

    it('remains valid after JSON serialization', () => {
      expectSchemaToPass(CompatibilityMatrixSchema, jsonRoundTrip(VALID_COMPATIBILITY_MATRIX))
    })

    it('rejects unknown top-level properties', () => {
      expectSchemaToFail(
        CompatibilityMatrixSchema,
        asUnknown({
          ...VALID_COMPATIBILITY_MATRIX,
          hacked: true,
        }),
      )
    })

    it('rejects unknown nested runtime properties', () => {
      expectSchemaToFail(
        CompatibilityMatrixSchema,
        asUnknown({
          ...VALID_COMPATIBILITY_MATRIX,
          runtime: {
            ...VALID_COMPATIBILITY_MATRIX.runtime,
            evil: true,
          },
        }),
      )
    })

    it('rejects unknown nested generation properties', () => {
      expectSchemaToFail(
        CompatibilityMatrixSchema,
        asUnknown({
          ...VALID_COMPATIBILITY_MATRIX,
          generation: {
            ...VALID_COMPATIBILITY_MATRIX.generation,
            hacked: true,
          },
        }),
      )
    })

    it('rejects unknown nested adapter properties', () => {
      expectSchemaToFail(
        CompatibilityMatrixSchema,
        asUnknown({
          ...VALID_COMPATIBILITY_MATRIX,
          adapters: [
            {
              ...VALID_COMPATIBILITY_MATRIX.adapters[0],
              malicious: true,
            },
          ],
        }),
      )
    })

    it('rejects unknown nested revocation properties', () => {
      expectSchemaToFail(
        CompatibilityMatrixSchema,
        asUnknown({
          ...VALID_COMPATIBILITY_MATRIX,
          revocations: {
            revokedArtifacts: [
              {
                ...VALID_COMPATIBILITY_MATRIX.revocations.revokedArtifacts[0],
                exploit: true,
              },
            ],
          },
        }),
      )
    })
  })
})
