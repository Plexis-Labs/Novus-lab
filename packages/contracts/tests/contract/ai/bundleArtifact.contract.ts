import {
  asUnknown,
  expectSchemaToFail,
  expectSchemaToPass,
  jsonRoundTrip,
} from '@novus/shared/testing'
import { describe, it } from 'vitest'

import VALID_FIXTURE from '../../../fixtures/ai/golden/bundleArtifact.valid.json'
import { BundleArtifactSchema } from '../../../src/ai/bundleArtifact.schema'
import { createBundleArtifactFixture } from '../../security/ai/bundleArtifact.security.test'

describe('BundleArtifact Contract', () => {
  describe('golden fixtures', () => {
    it('accepts the valid bundle artifact', () => {
      expectSchemaToPass(BundleArtifactSchema, jsonRoundTrip(VALID_FIXTURE))
    })
  })

  describe('integrity contract', () => {
    it('rejects an invalid source hash', () => {
      expectSchemaToFail(
        BundleArtifactSchema,
        asUnknown({
          ...VALID_FIXTURE,
          integrity: {
            ...VALID_FIXTURE.integrity,
            sourceHash: 'abc',
          },
        }),
      )
    })

    it('rejects an invalid compiled hash', () => {
      expectSchemaToFail(
        BundleArtifactSchema,
        asUnknown({
          ...VALID_FIXTURE,
          integrity: {
            ...VALID_FIXTURE.integrity,
            compiledHash: '123',
          },
        }),
      )
    })

    it('rejects an invalid manifest hash', () => {
      expectSchemaToFail(
        BundleArtifactSchema,
        asUnknown({
          ...VALID_FIXTURE,
          integrity: {
            ...VALID_FIXTURE.integrity,
            manifestHash: 'invalid',
          },
        }),
      )
    })

    it('rejects a missing signature', () => {
      expectSchemaToFail(
        BundleArtifactSchema,
        asUnknown({
          ...VALID_FIXTURE,
          integrity: {
            ...VALID_FIXTURE.integrity,
            signature: undefined,
          },
        }),
      )
    })
  })

  describe('payload contract', () => {
    it('rejects an empty compiledJs payload', () => {
      expectSchemaToFail(
        BundleArtifactSchema,
        asUnknown({
          ...VALID_FIXTURE,
          payload: {
            ...VALID_FIXTURE.payload,
            compiledJs: '',
          },
        }),
      )
    })

    it('accepts an omitted compiledCss payload', () => {
      const fixture = createBundleArtifactFixture()

      delete fixture.payload.compiledCss

      expectSchemaToPass(BundleArtifactSchema, fixture)
    })

    it('accepts an omitted sourceMap', () => {
      const fixture = createBundleArtifactFixture()

      delete fixture.payload.sourceMap

      expectSchemaToPass(BundleArtifactSchema, fixture)
    })
  })

  describe('compatibility contract', () => {
    it('rejects duplicate requiredCapabilities', () => {
      expectSchemaToFail(
        BundleArtifactSchema,
        asUnknown({
          ...VALID_FIXTURE,
          compatibility: {
            ...VALID_FIXTURE.compatibility,
            requiredCapabilities: ['workspace.read', 'workspace.read'],
          },
        }),
      )
    })

    it('accepts unique requiredCapabilities', () => {
      expectSchemaToPass(BundleArtifactSchema, jsonRoundTrip(VALID_FIXTURE))
    })
  })

  describe('strictness', () => {
    it('rejects unknown root properties', () => {
      expectSchemaToFail(
        BundleArtifactSchema,
        asUnknown({
          ...VALID_FIXTURE,
          injected: true,
        }),
      )
    })

    it('rejects unknown metadata properties', () => {
      expectSchemaToFail(
        BundleArtifactSchema,
        asUnknown({
          ...VALID_FIXTURE,
          metadata: {
            ...VALID_FIXTURE.metadata,
            debug: true,
          },
        }),
      )
    })

    it('rejects unknown integrity properties', () => {
      expectSchemaToFail(
        BundleArtifactSchema,
        asUnknown({
          ...VALID_FIXTURE,
          integrity: {
            ...VALID_FIXTURE.integrity,
            checksum: 'extra',
          },
        }),
      )
    })
  })
})
