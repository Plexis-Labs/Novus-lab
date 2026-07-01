import { asUnknown, expectSchemaToFail } from '@novus/shared/testing'
import { describe, it } from 'vitest'

import VALID_BUNDLE_ARTIFACT from '../../../fixtures/ai/golden/bundleArtifact.valid.json'
import { BundleArtifactSchema } from '../../../src/ai/bundleArtifact.schema'

import type { BundleArtifact } from '../../../src/ai/bundleArtifact.schema'

/**
 * Creates a deep-cloned BundleArtifact fixture.
 *
 * Unit tests intentionally mutate the returned
 * object to validate individual schema rules.
 *
 * Returning a fresh clone prevents test
 * pollution across the suite.
 */
export function createBundleArtifactFixture(): BundleArtifact {
  return structuredClone(VALID_BUNDLE_ARTIFACT) as BundleArtifact
}

describe('BundleArtifact Security', () => {
  it('rejects unknown root properties', () => {
    expectSchemaToFail(
      BundleArtifactSchema,
      asUnknown({
        ...createBundleArtifactFixture(),
        injected: true,
      }),
    )
  })

  it('rejects malformed source hashes', () => {
    expectSchemaToFail(
      BundleArtifactSchema,
      asUnknown({
        ...createBundleArtifactFixture(),
        integrity: {
          ...createBundleArtifactFixture().integrity,
          sourceHash: 'abc',
        },
      }),
    )
  })

  it('rejects malformed compiled hashes', () => {
    expectSchemaToFail(
      BundleArtifactSchema,
      asUnknown({
        ...createBundleArtifactFixture(),
        integrity: {
          ...createBundleArtifactFixture().integrity,
          compiledHash: '123',
        },
      }),
    )
  })

  it('rejects malformed manifest hashes', () => {
    expectSchemaToFail(
      BundleArtifactSchema,
      asUnknown({
        ...createBundleArtifactFixture(),
        integrity: {
          ...createBundleArtifactFixture().integrity,
          manifestHash: 'xyz',
        },
      }),
    )
  })

  it('rejects an unknown signature algorithm', () => {
    expectSchemaToFail(
      BundleArtifactSchema,
      asUnknown({
        ...createBundleArtifactFixture(),
        integrity: {
          ...createBundleArtifactFixture().integrity,
          signature: {
            ...createBundleArtifactFixture().integrity.signature,
            algorithm: 'rsa-2048',
          },
        },
      }),
    )
  })

  it('rejects duplicate capabilities', () => {
    expectSchemaToFail(
      BundleArtifactSchema,
      asUnknown({
        ...createBundleArtifactFixture(),
        compatibility: {
          ...createBundleArtifactFixture().compatibility,
          requiredCapabilities: ['workspace.read', 'workspace.read'],
        },
      }),
    )
  })

  it('rejects empty compiled JavaScript', () => {
    expectSchemaToFail(
      BundleArtifactSchema,
      asUnknown({
        ...createBundleArtifactFixture(),
        payload: {
          ...createBundleArtifactFixture().payload,
          compiledJs: '',
        },
      }),
    )
  })

  it('rejects missing signatures', () => {
    expectSchemaToFail(
      BundleArtifactSchema,
      asUnknown({
        ...createBundleArtifactFixture(),
        integrity: {
          ...createBundleArtifactFixture().integrity,
          signature: undefined,
        },
      }),
    )
  })

  it('rejects invalid UUIDs', () => {
    expectSchemaToFail(
      BundleArtifactSchema,
      asUnknown({
        ...createBundleArtifactFixture(),
        metadata: {
          ...createBundleArtifactFixture().metadata,
          artifactId: 'invalid',
        },
      }),
    )
  })
})
