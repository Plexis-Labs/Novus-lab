import { clone, omit } from '@novus/shared/testing'
import { describe, expect, it } from 'vitest'

import activeFixture from '../../../fixtures/security/golden/permissionGrant.active.json'
import revokedFixture from '../../../fixtures/security/golden/permissionGrant.revoke.json'
import invalidStateFixture from '../../../fixtures/security/invalid/permissionGrant.invalid-state.json'
import { PermissionGrantSchema } from '../../../src/security/permissionGrant.schema'

function createActiveGrantFixture(): typeof activeFixture {
  return clone(activeFixture)
}

function createRevokedGrantFixture(): typeof revokedFixture {
  return clone(revokedFixture)
}

describe('PermissionGrant Contract', () => {
  describe('golden fixtures', () => {
    it('accepts the active permission grant', () => {
      expect(() => PermissionGrantSchema.parse(createActiveGrantFixture())).not.toThrow()
    })

    it('accepts the revoked permission grant', () => {
      expect(() => PermissionGrantSchema.parse(createRevokedGrantFixture())).not.toThrow()
    })
  })

  describe('permission state invariants', () => {
    it('rejects a revoked grant without revokedAt', () => {
      expect(() =>
        PermissionGrantSchema.parse(omit(createRevokedGrantFixture(), 'revokedAt')),
      ).toThrow()
    })

    it('rejects the invalid-state fixture', () => {
      expect(() => PermissionGrantSchema.parse(clone(invalidStateFixture))).toThrow()
    })

    it('rejects approved capabilities when status is denied', () => {
      const grant = createActiveGrantFixture()

      grant.status = 'denied'

      expect(() => PermissionGrantSchema.parse(grant)).toThrow()
    })

    it('rejects approved capabilities outside the requested set', () => {
      const grant = createActiveGrantFixture()

      grant.approvedCapabilities = ['filesystem.delete']

      expect(() => PermissionGrantSchema.parse(grant)).toThrow()
    })

    it('rejects revokedAt before grantedAt', () => {
      const grant = createRevokedGrantFixture()

      grant.revokedAt = grant.grantedAt - 1

      expect(() => PermissionGrantSchema.parse(grant)).toThrow()
    })
  })

  describe('required protocol fields', () => {
    it('requires grantId', () => {
      expect(() =>
        PermissionGrantSchema.parse(omit(createActiveGrantFixture(), 'grantId')),
      ).toThrow()
    })

    it('requires featureId', () => {
      expect(() =>
        PermissionGrantSchema.parse(omit(createActiveGrantFixture(), 'featureId')),
      ).toThrow()
    })

    it('requires requestedCapabilities', () => {
      expect(() =>
        PermissionGrantSchema.parse(omit(createActiveGrantFixture(), 'requestedCapabilities')),
      ).toThrow()
    })

    it('requires approvedCapabilities', () => {
      expect(() =>
        PermissionGrantSchema.parse(omit(createActiveGrantFixture(), 'approvedCapabilities')),
      ).toThrow()
    })

    it('requires scope', () => {
      expect(() => PermissionGrantSchema.parse(omit(createActiveGrantFixture(), 'scope'))).toThrow()
    })

    it('requires sitePattern', () => {
      expect(() =>
        PermissionGrantSchema.parse(omit(createActiveGrantFixture(), 'sitePattern')),
      ).toThrow()
    })

    it('requires status', () => {
      expect(() =>
        PermissionGrantSchema.parse(omit(createActiveGrantFixture(), 'status')),
      ).toThrow()
    })

    it('requires grantedAt', () => {
      expect(() =>
        PermissionGrantSchema.parse(omit(createActiveGrantFixture(), 'grantedAt')),
      ).toThrow()
    })
  })
})
