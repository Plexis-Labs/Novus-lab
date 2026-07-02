import { asUnknown, jsonRoundTrip } from '@novus/shared/testing'
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
describe('BundleArtifactSchema', () => {
  describe('golden validation', () => {
    it('accepts a valid bundle artifact', () => {
      expect(() =>
        BundleArtifactSchema.parse(jsonRoundTrip(createBundleArtifactFixture())),
      ).not.toThrow()
    })

    it('round-trips through JSON serialization', () => {
      const parsed = BundleArtifactSchema.parse(jsonRoundTrip(createBundleArtifactFixture()))

      expect(parsed).toEqual(createBundleArtifactFixture())
    })

    it('preserves nested object structure', () => {
      const parsed = BundleArtifactSchema.parse(createBundleArtifactFixture())

      expect(parsed.metadata).toBeDefined()
      expect(parsed.payload).toBeDefined()
      expect(parsed.compatibility).toBeDefined()
      expect(parsed.compiler).toBeDefined()
      expect(parsed.integrity).toBeDefined()
    })
  })

  describe('metadata validation', () => {
    it('rejects a missing metadata block', () => {
      const spec = createBundleArtifactFixture()

      delete (
        spec as {
          metadata?: unknown
        }
      ).metadata

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects an invalid artifact identifier', () => {
      const spec = createBundleArtifactFixture()

      spec.metadata.artifactId = 'not-a-uuid'

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects an invalid feature identifier', () => {
      const spec = createBundleArtifactFixture()

      spec.metadata.featureId = 'invalid'

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects featureVersion equal to zero', () => {
      const spec = createBundleArtifactFixture()

      spec.metadata.featureVersion = 0

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects negative featureVersion', () => {
      const spec = createBundleArtifactFixture()

      spec.metadata.featureVersion = -1

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects non-integer featureVersion', () => {
      const spec = createBundleArtifactFixture()

      spec.metadata.featureVersion = 1.5

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects unexpected metadata properties', () => {
      expect(() =>
        BundleArtifactSchema.parse(
          asUnknown({
            ...createBundleArtifactFixture(),
            metadata: {
              ...createBundleArtifactFixture().metadata,
              extra: true,
            },
          }),
        ),
      ).toThrow()
    })
  })

  describe('payload validation', () => {
    it('rejects an empty compiledJs payload', () => {
      const spec = createBundleArtifactFixture()

      spec.payload.compiledJs = ''

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects a whitespace-only compiledJs payload', () => {
      const spec = createBundleArtifactFixture()

      spec.payload.compiledJs = '     '

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('accepts an omitted compiledCss payload', () => {
      const spec = createBundleArtifactFixture()

      delete spec.payload.compiledCss

      expect(() => BundleArtifactSchema.parse(spec)).not.toThrow()
    })

    it('rejects an empty compiledCss payload', () => {
      const spec = createBundleArtifactFixture()

      spec.payload.compiledCss = ''

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('accepts an omitted sourceMap', () => {
      const spec = createBundleArtifactFixture()

      delete spec.payload.sourceMap

      expect(() => BundleArtifactSchema.parse(spec)).not.toThrow()
    })

    it('rejects an empty sourceMap', () => {
      const spec = createBundleArtifactFixture()

      spec.payload.sourceMap = ''

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects unexpected payload properties', () => {
      expect(() =>
        BundleArtifactSchema.parse(
          asUnknown({
            ...createBundleArtifactFixture(),
            payload: {
              ...createBundleArtifactFixture().payload,
              injected: true,
            },
          }),
        ),
      ).toThrow()
    })
  })

  describe('compatibility validation', () => {
    it('rejects an empty minimumSdkVersion', () => {
      const spec = createBundleArtifactFixture()

      spec.compatibility.minimumSdkVersion = ''

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects an empty maximumSdkVersion', () => {
      const spec = createBundleArtifactFixture()

      spec.compatibility.maximumSdkVersion = ''

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects an empty requiredCapabilities collection', () => {
      const spec = createBundleArtifactFixture()

      spec.compatibility.requiredCapabilities = []

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects duplicate requiredCapabilities', () => {
      const spec = createBundleArtifactFixture()

      spec.compatibility.requiredCapabilities = ['workspace.read', 'workspace.read']

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects unexpected compatibility properties', () => {
      expect(() =>
        BundleArtifactSchema.parse(
          asUnknown({
            ...createBundleArtifactFixture(),
            compatibility: {
              ...createBundleArtifactFixture().compatibility,
              experimental: true,
            },
          }),
        ),
      ).toThrow()
    })

    it('accepts a valid compatibility block', () => {
      expect(() => BundleArtifactSchema.parse(createBundleArtifactFixture())).not.toThrow()
    })
  })

  describe('compiler validation', () => {
    it('rejects an empty compiler version', () => {
      const spec = createBundleArtifactFixture()

      spec.compiler.version = ''

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects an empty build identifier', () => {
      const spec = createBundleArtifactFixture()

      spec.compiler.buildId = ''

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects compiledAt equal to zero', () => {
      const spec = createBundleArtifactFixture()

      spec.compiler.compiledAt = 0

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects a negative compiledAt timestamp', () => {
      const spec = createBundleArtifactFixture()

      spec.compiler.compiledAt = -1

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects a non-integer compiledAt timestamp', () => {
      const spec = createBundleArtifactFixture()

      spec.compiler.compiledAt = 1.25

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects unexpected compiler properties', () => {
      expect(() =>
        BundleArtifactSchema.parse(
          asUnknown({
            ...createBundleArtifactFixture(),
            compiler: {
              ...createBundleArtifactFixture().compiler,
              internal: true,
            },
          }),
        ),
      ).toThrow()
    })
  })

  describe('integrity validation', () => {
    it('rejects an invalid sourceHash', () => {
      const spec = createBundleArtifactFixture()

      spec.integrity.sourceHash = 'invalid'

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects an invalid compiledHash', () => {
      const spec = createBundleArtifactFixture()

      spec.integrity.compiledHash = '123'

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects an invalid manifestHash', () => {
      const spec = createBundleArtifactFixture()

      spec.integrity.manifestHash = 'abcdef'

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects non-hexadecimal hashes', () => {
      const spec = createBundleArtifactFixture()

      spec.integrity.sourceHash = 'GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG'

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects missing integrity', () => {
      const spec = createBundleArtifactFixture()

      delete (
        spec as {
          integrity?: unknown
        }
      ).integrity

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects unexpected integrity properties', () => {
      expect(() =>
        BundleArtifactSchema.parse(
          asUnknown({
            ...createBundleArtifactFixture(),
            integrity: {
              ...createBundleArtifactFixture().integrity,
              checksum: 'abc',
            },
          }),
        ),
      ).toThrow()
    })
  })

  describe('signature validation', () => {
    it('rejects an empty issuerId', () => {
      const spec = createBundleArtifactFixture()

      spec.integrity.signature.issuerId = ''

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects an empty keyId', () => {
      const spec = createBundleArtifactFixture()

      spec.integrity.signature.keyId = ''

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects an unknown signing algorithm', () => {
      expect(() =>
        BundleArtifactSchema.parse(
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
        ),
      ).toThrow()
    })

    it('rejects an empty signature', () => {
      const spec = createBundleArtifactFixture()

      spec.integrity.signature.value = ''

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects a missing signature object', () => {
      const spec = createBundleArtifactFixture()

      delete (
        spec.integrity as {
          signature?: unknown
        }
      ).signature

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('rejects unexpected signature properties', () => {
      expect(() =>
        BundleArtifactSchema.parse(
          asUnknown({
            ...createBundleArtifactFixture(),
            integrity: {
              ...createBundleArtifactFixture().integrity,
              signature: {
                ...createBundleArtifactFixture().integrity.signature,
                certificate: 'extra',
              },
            },
          }),
        ),
      ).toThrow()
    })
  })

  describe('cross-schema refinements', () => {
    it('rejects duplicate requiredCapabilities', () => {
      const spec = createBundleArtifactFixture()

      spec.compatibility.requiredCapabilities = ['workspace.read', 'notes.write', 'workspace.read']

      expect(() => BundleArtifactSchema.parse(spec)).toThrow()
    })

    it('accepts unique requiredCapabilities', () => {
      const spec = createBundleArtifactFixture()

      spec.compatibility.requiredCapabilities = ['workspace.read', 'notes.write', 'repository.read']

      expect(() => BundleArtifactSchema.parse(spec)).not.toThrow()
    })

    /**
     * Future-proofing.
     *
     * When semantic SDK validation is introduced,
     * these tests become active.
     */
    it.todo('rejects minimumSdkVersion greater than maximumSdkVersion')

    /**
     * Runtime verifier responsibility.
     *
     * The schema intentionally does not perform
     * cryptographic verification.
     */
    it.todo('runtime rejects an artifact whose compiledHash does not match the payload')

    it.todo('runtime rejects an artifact whose manifestHash does not match the canonical manifest')

    it.todo('runtime rejects an artifact with an invalid gateway signature')

    it.todo('runtime rejects an artifact signed by an unknown issuer')
  })
})
