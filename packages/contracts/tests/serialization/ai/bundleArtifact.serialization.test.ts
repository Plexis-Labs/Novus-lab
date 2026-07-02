import { jsonRoundTrip } from '@novus/shared/testing'
import { describe, expect, it } from 'vitest'

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

describe('BundleArtifact Serialization', () => {
  it('round-trips through JSON serialization', () => {
    const artifact = createBundleArtifactFixture()

    const roundTrip = jsonRoundTrip(artifact)

    expect(roundTrip).toEqual(artifact)
  })

  it('parses after serialization', () => {
    const parsed = BundleArtifactSchema.parse(jsonRoundTrip(createBundleArtifactFixture()))

    expect(parsed).toEqual(createBundleArtifactFixture())
  })

  it('preserves payload', () => {
    const parsed = BundleArtifactSchema.parse(jsonRoundTrip(createBundleArtifactFixture()))

    expect(parsed.payload).toEqual(createBundleArtifactFixture().payload)
  })

  it('preserves integrity metadata', () => {
    const parsed = BundleArtifactSchema.parse(jsonRoundTrip(createBundleArtifactFixture()))

    expect(parsed.integrity).toEqual(createBundleArtifactFixture().integrity)
  })

  it('preserves compatibility', () => {
    const parsed = BundleArtifactSchema.parse(jsonRoundTrip(createBundleArtifactFixture()))

    expect(parsed.compatibility).toEqual(createBundleArtifactFixture().compatibility)
  })

  it('preserves compiler metadata', () => {
    const parsed = BundleArtifactSchema.parse(jsonRoundTrip(createBundleArtifactFixture()))

    expect(parsed.compiler).toEqual(createBundleArtifactFixture().compiler)
  })
})
