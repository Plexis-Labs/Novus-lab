import { describe, expect, it } from 'vitest'

import {
  VALID_CAPABILITY_TOKEN,
  INVALID_UUID_TOKEN,
  EMPTY_CAPABILITY_TOKEN,
  DUPLICATE_CAPABILITY_TOKEN,
  INVALID_LIFETIME_TOKEN,
  REVERSED_TIME_TOKEN,
  MISSING_BINDING_TOKEN,
  EXTRA_PROPERTY_TOKEN,
} from '../../../fixtures/security/capabilityToken.fixtures'
import { CapabilityTokenJsonSchema } from '../../../generated/capabilityToken.json-schema'
import { CapabilityTokenSchema } from '../../../src/security/capabilityToken.schema'

describe('CapabilityToken JSON Schema', () => {
  it('should generate a JSON schema', () => {
    expect(CapabilityTokenJsonSchema).toBeDefined()
  })
})

describe('CapabilityTokenSchema', () => {
  describe('valid payloads', () => {
    it('should parse a valid capability token', () => {
      expect(() => CapabilityTokenSchema.parse(VALID_CAPABILITY_TOKEN)).not.toThrow()
    })
  })

  describe('invalid payloads', () => {
    it('should reject invalid UUID', () => {
      expect(() => CapabilityTokenSchema.parse(INVALID_UUID_TOKEN)).toThrow()
    })

    it('should reject empty capabilities', () => {
      expect(() => CapabilityTokenSchema.parse(EMPTY_CAPABILITY_TOKEN)).toThrow()
    })

    it('should reject duplicate capabilities', () => {
      expect(() => CapabilityTokenSchema.parse(DUPLICATE_CAPABILITY_TOKEN)).toThrow()
    })

    it('should reject invalid lifetime', () => {
      expect(() => CapabilityTokenSchema.parse(INVALID_LIFETIME_TOKEN)).toThrow()
    })

    it('should reject expiresAt before issuedAt', () => {
      expect(() => CapabilityTokenSchema.parse(REVERSED_TIME_TOKEN)).toThrow()
    })

    it('should reject missing binding fields', () => {
      expect(() => CapabilityTokenSchema.parse(MISSING_BINDING_TOKEN)).toThrow()
    })

    it('should reject extra properties', () => {
      expect(() => CapabilityTokenSchema.parse(EXTRA_PROPERTY_TOKEN)).toThrow()
    })
  })
})
