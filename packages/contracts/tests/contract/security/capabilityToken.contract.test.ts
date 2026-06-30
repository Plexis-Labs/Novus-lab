import { describe, expect, it } from 'vitest'

import { VALID_CAPABILITY_TOKEN } from '../../../fixtures/security/capabilityToken.fixtures'
import { CapabilityTokenSchema } from '../../../src/security/capabilityToken.schema'

/**
 * Creates a shallow copy of an object with a single property removed.
 * Used for validating required contract fields.
 */
function omit<T extends Record<PropertyKey, unknown>, K extends keyof T>(
  object: T,
  key: K,
): Omit<T, K> {
  const clone = { ...object }

  Reflect.deleteProperty(clone, key)

  return clone
}

describe('CapabilityToken Contract', () => {
  it('accepts the canonical capability token', () => {
    expect(CapabilityTokenSchema.safeParse(VALID_CAPABILITY_TOKEN).success).toBe(true)
  })

  describe('required fields', () => {
    it('requires capabilityTokenId', () => {
      expect(
        CapabilityTokenSchema.safeParse(omit(VALID_CAPABILITY_TOKEN, 'capabilityTokenId')).success,
      ).toBe(false)
    })

    it('requires featureId', () => {
      expect(
        CapabilityTokenSchema.safeParse(omit(VALID_CAPABILITY_TOKEN, 'featureId')).success,
      ).toBe(false)
    })

    it('requires featureVersion', () => {
      expect(
        CapabilityTokenSchema.safeParse(omit(VALID_CAPABILITY_TOKEN, 'featureVersion')).success,
      ).toBe(false)
    })

    it('requires binding', () => {
      expect(CapabilityTokenSchema.safeParse(omit(VALID_CAPABILITY_TOKEN, 'binding')).success).toBe(
        false,
      )
    })

    it('requires capabilities', () => {
      expect(
        CapabilityTokenSchema.safeParse(omit(VALID_CAPABILITY_TOKEN, 'capabilities')).success,
      ).toBe(false)
    })

    it('requires issuedAt', () => {
      expect(
        CapabilityTokenSchema.safeParse(omit(VALID_CAPABILITY_TOKEN, 'issuedAt')).success,
      ).toBe(false)
    })

    it('requires expiresAt', () => {
      expect(
        CapabilityTokenSchema.safeParse(omit(VALID_CAPABILITY_TOKEN, 'expiresAt')).success,
      ).toBe(false)
    })

    it('requires signature', () => {
      expect(
        CapabilityTokenSchema.safeParse(omit(VALID_CAPABILITY_TOKEN, 'signature')).success,
      ).toBe(false)
    })
  })

  describe('strict contract', () => {
    it('rejects unknown properties', () => {
      const token = {
        ...VALID_CAPABILITY_TOKEN,
        hacker: true,
      }

      expect(CapabilityTokenSchema.safeParse(token).success).toBe(false)
    })
  })
})
