import { asUnknown, clone, expectSchemaToFail } from '@novus/shared/testing'
import { describe, it } from 'vitest'

import activeFixture from '../../../fixtures/security/golden/permissionGrant.active.json'
import { PermissionGrantSchema } from '../../../src/security/permissionGrant.schema'

describe('PermissionGrant Security', () => {
  describe('strict mode', () => {
    it('rejects unexpected properties', () => {
      expectSchemaToFail(
        PermissionGrantSchema,
        asUnknown({
          ...clone(activeFixture),
          injected: true,
        }),
      )
    })

    it('rejects nested unexpected properties', () => {
      expectSchemaToFail(
        PermissionGrantSchema,
        asUnknown({
          ...clone(activeFixture),
          metadata: {},
        }),
      )
    })
  })

  describe('enum hardening', () => {
    it('rejects unknown permission scopes', () => {
      expectSchemaToFail(
        PermissionGrantSchema,
        asUnknown({
          ...clone(activeFixture),
          scope: 'enterprise',
        }),
      )
    })

    it('rejects unknown permission states', () => {
      expectSchemaToFail(
        PermissionGrantSchema,
        asUnknown({
          ...clone(activeFixture),
          status: 'approved',
        }),
      )
    })
  })

  describe('identity integrity', () => {
    it('rejects malformed grant identifiers', () => {
      expectSchemaToFail(
        PermissionGrantSchema,
        asUnknown({
          ...clone(activeFixture),
          grantId: 'root',
        }),
      )
    })

    it('rejects malformed feature identifiers', () => {
      expectSchemaToFail(
        PermissionGrantSchema,
        asUnknown({
          ...clone(activeFixture),
          featureId: 'feature-1',
        }),
      )
    })
  })

  describe('audit integrity', () => {
    it('rejects negative grant timestamps', () => {
      expectSchemaToFail(
        PermissionGrantSchema,
        asUnknown({
          ...clone(activeFixture),
          grantedAt: -1,
        }),
      )
    })

    it('rejects fractional timestamps', () => {
      expectSchemaToFail(
        PermissionGrantSchema,
        asUnknown({
          ...clone(activeFixture),
          grantedAt: 123.45,
        }),
      )
    })
  })

  describe('capability integrity', () => {
    it('rejects empty requested capability sets', () => {
      expectSchemaToFail(
        PermissionGrantSchema,
        asUnknown({
          ...clone(activeFixture),
          requestedCapabilities: [],
        }),
      )
    })
  })
})
