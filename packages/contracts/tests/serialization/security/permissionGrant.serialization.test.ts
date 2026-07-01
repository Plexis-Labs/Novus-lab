import { clone, expectSchemaToFail, expectSchemaToPass, jsonRoundTrip } from '@novus/shared/testing'
import { describe, expect, it } from 'vitest'

import activeFixture from '../../../fixtures/security/golden/permissionGrant.active.json'
import revokedFixture from '../../../fixtures/security/golden/permissionGrant.revoke.json'
import { PermissionGrantSchema } from '../../../src/security/permissionGrant.schema'

describe('PermissionGrant Serialization', () => {
  describe('json round-trip', () => {
    it('preserves an active permission grant', () => {
      expectSchemaToPass(PermissionGrantSchema, jsonRoundTrip(clone(activeFixture)))
    })

    it('preserves a revoked permission grant', () => {
      expectSchemaToPass(PermissionGrantSchema, jsonRoundTrip(clone(revokedFixture)))
    })
  })

  describe('state preservation', () => {
    it('preserves approved capabilities', () => {
      const payload = jsonRoundTrip(clone(activeFixture))

      expect(payload.approvedCapabilities).toEqual(activeFixture.approvedCapabilities)
    })

    it('preserves permission status', () => {
      const payload = jsonRoundTrip(clone(revokedFixture))

      expect(payload.status).toBe('revoked')
    })

    it('preserves revocation timestamp', () => {
      const payload = jsonRoundTrip(clone(revokedFixture))

      expect(payload.revokedAt).toBe(revokedFixture.revokedAt)
    })
  })

  describe('serialization safety', () => {
    it('rejects corrupted serialized data', () => {
      const payload = jsonRoundTrip(clone(activeFixture))

      payload.featureVersion = '1' as never

      expectSchemaToFail(PermissionGrantSchema, payload)
    })
  })
})
