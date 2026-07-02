import { expectSchemaToFail, asUnknown } from '@novus/shared/testing'
import { describe, it } from 'vitest'

import { VALID_COMPATIBILITY_MATRIX } from '../../../fixtures/platform/golden/compatibilityMatrix.valid'
import { CompatibilityMatrixSchema } from '../../../src/platform/compatibilityMatrix.schema'

describe('CompatibilityMatrix security', () => {
  it('rejects unknown top-level properties', () => {
    expectSchemaToFail(
      CompatibilityMatrixSchema,
      asUnknown({
        ...VALID_COMPATIBILITY_MATRIX,
        __proto__: {},
        administrator: true,
      }),
    )
  })

  it('rejects unknown runtime properties', () => {
    expectSchemaToFail(
      CompatibilityMatrixSchema,
      asUnknown({
        ...VALID_COMPATIBILITY_MATRIX,
        runtime: {
          ...VALID_COMPATIBILITY_MATRIX.runtime,
          bypassValidation: true,
        },
      }),
    )
  })

  it('rejects unknown generation properties', () => {
    expectSchemaToFail(
      CompatibilityMatrixSchema,
      asUnknown({
        ...VALID_COMPATIBILITY_MATRIX,
        generation: {
          ...VALID_COMPATIBILITY_MATRIX.generation,
          jailbreakPrompt: '...',
        },
      }),
    )
  })

  it('rejects unknown adapter properties', () => {
    expectSchemaToFail(
      CompatibilityMatrixSchema,
      asUnknown({
        ...VALID_COMPATIBILITY_MATRIX,
        adapters: [
          {
            ...VALID_COMPATIBILITY_MATRIX.adapters[0],
            hiddenCapability: 'admin',
          },
        ],
      }),
    )
  })

  it('rejects unknown revocation properties', () => {
    expectSchemaToFail(
      CompatibilityMatrixSchema,
      asUnknown({
        ...VALID_COMPATIBILITY_MATRIX,
        revocations: {
          revokedArtifacts: [
            {
              ...VALID_COMPATIBILITY_MATRIX.revocations.revokedArtifacts[0],
              bypassSignature: true,
            },
          ],
        },
      }),
    )
  })

  it('rejects prototype pollution attempts', () => {
    expectSchemaToFail(
      CompatibilityMatrixSchema,
      asUnknown({
        ...VALID_COMPATIBILITY_MATRIX,
        __proto__: {
          hacked: true,
        },
      }),
    )
  })

  it('rejects injected nested objects', () => {
    expectSchemaToFail(
      CompatibilityMatrixSchema,
      asUnknown({
        ...VALID_COMPATIBILITY_MATRIX,
        runtime: {
          ...VALID_COMPATIBILITY_MATRIX.runtime,
          permissions: {
            admin: true,
          },
        },
      }),
    )
  })
})
