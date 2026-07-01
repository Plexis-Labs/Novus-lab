import { clone, omit } from '@novus/shared/testing'
import { describe, expect, it } from 'vitest'

import activeFixture from '../../../fixtures/security/golden/permissionGrant.active.json'
import revokedFixture from '../../../fixtures/security/golden/permissionGrant.revoke.json'
import { PermissionGrantSchema } from '../../../src/security/permissionGrant.schema'

/**
 * Returns an isolated copy of the active fixture.
 */
function createActiveGrantFixture(): typeof activeFixture {
  return clone(activeFixture)
}

/**
 * Returns an isolated copy of the revoked fixture.
 */
function createRevokedGrantFixture(): typeof revokedFixture {
  return clone(revokedFixture)
}

describe('PermissionGrantSchema', () => {
  describe('golden paths', () => {
    it('accepts a valid granted permission', () => {
      expect(() => PermissionGrantSchema.parse(createActiveGrantFixture())).not.toThrow()
    })

    it('accepts a valid revoked permission', () => {
      expect(() => PermissionGrantSchema.parse(createRevokedGrantFixture())).not.toThrow()
    })
  })

  describe('identity', () => {
    it('rejects an invalid grantId', () => {
      const grant = createActiveGrantFixture()

      grant.grantId = 'invalid'

      expect(() => PermissionGrantSchema.parse(grant)).toThrow()
    })

    it('rejects an invalid featureId', () => {
      const grant = createActiveGrantFixture()

      grant.featureId = 'invalid'

      expect(() => PermissionGrantSchema.parse(grant)).toThrow()
    })

    it('rejects a non-positive featureVersion', () => {
      const grant = createActiveGrantFixture()

      grant.featureVersion = 0

      expect(() => PermissionGrantSchema.parse(grant)).toThrow()
    })
  })

  describe('requested capabilities', () => {
    it('rejects an empty requestedCapabilities array', () => {
      const grant = createActiveGrantFixture()

      grant.requestedCapabilities = []

      expect(() => PermissionGrantSchema.parse(grant)).toThrow()
    })
  })

  describe('site scope', () => {
    it('rejects an empty sitePattern', () => {
      const grant = createActiveGrantFixture()

      grant.sitePattern = ''

      expect(() => PermissionGrantSchema.parse(grant)).toThrow()
    })
  })

  describe('audit timestamps', () => {
    it('rejects a non-positive grantedAt timestamp', () => {
      const grant = createActiveGrantFixture()

      grant.grantedAt = 0

      expect(() => PermissionGrantSchema.parse(grant)).toThrow()
    })

    it('rejects a non-positive revokedAt timestamp', () => {
      const grant = createRevokedGrantFixture()

      grant.revokedAt = 0

      expect(() => PermissionGrantSchema.parse(grant)).toThrow()
    })
  })

  describe('strict mode', () => {
    it('rejects additional properties', () => {
      const grant = {
        ...createActiveGrantFixture(),
        injected: true,
      }

      expect(() => PermissionGrantSchema.parse(grant)).toThrow()
    })

    it('rejects a missing grantId', () => {
      expect(() =>
        PermissionGrantSchema.parse(omit(createActiveGrantFixture(), 'grantId')),
      ).toThrow()
    })

    it('rejects a missing featureId', () => {
      expect(() =>
        PermissionGrantSchema.parse(omit(createActiveGrantFixture(), 'featureId')),
      ).toThrow()
    })
  })

  describe('scope', () => {
    it('rejects an unknown scope', () => {
      const grant = createActiveGrantFixture()

      grant.scope = 'workspace'

      expect(() => PermissionGrantSchema.parse(grant)).toThrow()
    })
  })

  describe('status', () => {
    it('rejects an unknown status', () => {
      const grant = createActiveGrantFixture()

      grant.status = 'approved'

      expect(() => PermissionGrantSchema.parse(grant)).toThrow()
    })
  })

  describe('approved capabilities', () => {
    it('accepts an empty approvedCapabilities array', () => {
      const grant = createActiveGrantFixture()

      grant.approvedCapabilities = []

      expect(() => PermissionGrantSchema.parse(grant)).not.toThrow()
    })
  })

  it('rejects a non-integer featureVersion', () => {
    const grant = createActiveGrantFixture()

    grant.featureVersion = 1.5

    expect(() => PermissionGrantSchema.parse(grant)).toThrow()
  })

  it('rejects a fractional grantedAt timestamp', () => {
    const grant = createActiveGrantFixture()

    grant.grantedAt = 123.456

    expect(() => PermissionGrantSchema.parse(grant)).toThrow()
  })

  it('accepts an empty approvedCapabilities array', () => {
    const grant = createActiveGrantFixture()

    grant.approvedCapabilities = []

    expect(() => PermissionGrantSchema.parse(grant)).not.toThrow()
  })
})
