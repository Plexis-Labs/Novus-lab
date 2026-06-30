import { describe, expect, it } from 'vitest'

import { VALID_CAPABILITY_TOKEN } from '../../../fixtures/security/capabilityToken.fixtures'
import { CapabilityTokenSchema } from '../../../src/security/capabilityToken.schema'

describe('CapabilityToken Serialization', () => {
  it('should survive JSON serialization', () => {
    const serialized = JSON.stringify(VALID_CAPABILITY_TOKEN)

    const parsed: unknown = JSON.parse(serialized)

    expect(() => CapabilityTokenSchema.parse(parsed)).not.toThrow()
  })

  it('should preserve all values', () => {
    const restored: unknown = JSON.parse(JSON.stringify(VALID_CAPABILITY_TOKEN))

    expect(restored).toEqual(VALID_CAPABILITY_TOKEN)
  })

  it('should preserve nested binding', () => {
    const restored: unknown = JSON.parse(JSON.stringify(VALID_CAPABILITY_TOKEN))
    const parsed = CapabilityTokenSchema.parse(restored)

    expect(parsed.binding).toEqual(VALID_CAPABILITY_TOKEN.binding)
  })

  it('should preserve capabilities array', () => {
    const restored: unknown = JSON.parse(JSON.stringify(VALID_CAPABILITY_TOKEN))

    const parsed = CapabilityTokenSchema.parse(restored)
    expect(parsed.capabilities).toEqual(VALID_CAPABILITY_TOKEN.capabilities)
  })
})
