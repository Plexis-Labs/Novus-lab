import {
  expectSchemaToPass,
  jsonRoundTrip,
  expectSchemaToFail,
  asUnknown,
} from '@novus/shared/testing'
import { describe, expect, it } from 'vitest'

import { VALID_COMPATIBILITY_MATRIX } from '../../../fixtures/platform/golden/compatibilityMatrix.valid'
import { CompatibilityMatrixSchema } from '../../../src/platform/compatibilityMatrix.schema'
import { createCompatibilityMatrixFixture } from '../../fixtures/compatibilityMatrix.fixture'

describe('CompatibilityMatrixSchema', () => {
  describe('golden paths', () => {
    it('parses a valid compatibility matrix', () => {
      expectSchemaToPass(CompatibilityMatrixSchema, jsonRoundTrip(VALID_COMPATIBILITY_MATRIX))
    })

    it('round-trips through JSON serialization', () => {
      expectSchemaToPass(
        CompatibilityMatrixSchema,
        jsonRoundTrip(createCompatibilityMatrixFixture()),
      )
    })
  })
})

describe('metadata validation', () => {
  it('rejects an invalid schema version', () => {
    expectSchemaToFail(
      CompatibilityMatrixSchema,
      asUnknown({
        ...createCompatibilityMatrixFixture(),
        metadata: {
          ...createCompatibilityMatrixFixture().metadata,
          schemaVersion: 99,
        },
      }),
    )
  })

  it('rejects a negative publication timestamp', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.metadata.publishedAt = -1

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })
})

describe('runtime compatibility validation', () => {
  it('rejects an invalid runtime version', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.runtime.runtimeVersion = 'runtime-v2'

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects an empty supported SDK version range', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.runtime.supportedSdkVersions = ''

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects an empty supported compiler version range', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.runtime.supportedCompilerVersions = ''

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects an empty supported manifest version range', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.runtime.supportedManifestVersions = ''

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })
})

describe('generation compatibility validation', () => {
  it('rejects an empty supported providers list', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.generation.supportedProviders = []

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects an empty supported models list', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.generation.supportedModels = []

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects an empty supported prompt versions list', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.generation.supportedPromptVersions = []

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects duplicate supported providers', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.generation.supportedProviders = ['google', 'google']

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects duplicate supported models', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.generation.supportedModels = ['gemini-2.5-pro', 'gemini-2.5-pro']

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects duplicate prompt versions', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.generation.supportedPromptVersions = ['planner-v1', 'planner-v1']

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })
})

describe('adapter compatibility validation', () => {
  it('accepts an active adapter', () => {
    expect(() => CompatibilityMatrixSchema.parse(createCompatibilityMatrixFixture())).not.toThrow()
  })

  it('rejects an empty adapter identifier', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.adapters[0].adapterId = ''

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects an invalid adapter version', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.adapters[0].version = 'adapter-v2'

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects an empty supported version range', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.adapters[0].supportedVersions = ''

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('requires deprecatedSince when an adapter is deprecated', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.adapters[0].deprecated = true
    delete matrix.adapters[0].deprecatedSince

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects deprecatedSince for active adapters', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.adapters[0].deprecated = false
    matrix.adapters[0].deprecatedSince = '2.0.0'

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects duplicate adapter identifiers', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.adapters.push({
      ...matrix.adapters[0],
      adapterId: matrix.adapters[0].adapterId,
    })

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })
})
describe('revocation policy validation', () => {
  it('accepts an empty revocation list', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.revocations.revokedArtifacts = []

    expect(() => CompatibilityMatrixSchema.parse(matrix)).not.toThrow()
  })

  it('rejects an invalid manifest hash', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.revocations.revokedArtifacts[0].manifestHash = 'invalid-hash'

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects an invalid revocation reason', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.revocations.revokedArtifacts[0].reason = 'expired' as never

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects a negative revocation timestamp', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.revocations.revokedArtifacts[0].revokedAt = -1

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects an empty revocation message', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.revocations.revokedArtifacts[0].message = ''

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects duplicate revoked artifact hashes', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.revocations.revokedArtifacts.push({
      ...matrix.revocations.revokedArtifacts[0],
    })

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })
})

describe('recommendations validation', () => {
  it('rejects an invalid latest runtime version', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.recommendations.latestRuntimeVersion = 'runtime-v2'

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects an invalid latest SDK version', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.recommendations.latestSdkVersion = 'sdk-v2'

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })

  it('rejects an invalid latest compiler version', () => {
    const matrix = createCompatibilityMatrixFixture()

    matrix.recommendations.latestCompilerVersion = 'compiler-v2'

    expect(() => CompatibilityMatrixSchema.parse(matrix)).toThrow()
  })
})
