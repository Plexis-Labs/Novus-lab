import { asUnknown, clone } from '@novus/shared/testing'
import { describe, expect, it } from 'vitest'

import requestFixture from '../../../fixtures/bridge/golden/bridgeEnvelope.request.json'
import { BridgeEnvelopeSchema } from '../../../src/bridge/bridgeEnvelope.schema'

function createRequestFixture(): typeof requestFixture {
  return clone(requestFixture)
}

describe('BridgeEnvelope Security', () => {
  describe('strict object validation', () => {
    it('rejects undocumented root properties', () => {
      const payload = asUnknown({
        ...createRequestFixture(),
        injected: true,
      })

      expect(() => BridgeEnvelopeSchema.parse(payload)).toThrow()
    })

    it('rejects undocumented header properties', () => {
      const payload = asUnknown({
        ...createRequestFixture(),
        header: {
          ...createRequestFixture().header,
          attacker: true,
        },
      })

      expect(() => BridgeEnvelopeSchema.parse(payload)).toThrow()
    })

    it('rejects undocumented capability token properties', () => {
      const payload = asUnknown({
        ...createRequestFixture(),
        capabilityToken: {
          ...createRequestFixture().capabilityToken,
          admin: true,
        },
      })

      expect(() => BridgeEnvelopeSchema.parse(payload)).toThrow()
    })
  })

  describe('protocol tampering', () => {
    it('rejects forged message kinds', () => {
      const payload = asUnknown({
        ...createRequestFixture(),
        kind: 'admin',
      })

      expect(() => BridgeEnvelopeSchema.parse(payload)).toThrow()
    })

    it('rejects malformed protocol versions', () => {
      const payload = asUnknown({
        ...createRequestFixture(),
        header: {
          ...createRequestFixture().header,
          protocolVersion: 999,
        },
      })

      expect(() => BridgeEnvelopeSchema.parse(payload)).toThrow()
    })

    it('rejects forged bridge sources', () => {
      const payload = asUnknown({
        ...createRequestFixture(),
        header: {
          ...createRequestFixture().header,
          source: 'planner',
        },
      })

      expect(() => BridgeEnvelopeSchema.parse(payload)).toThrow()
    })
  })

  describe('capability enforcement', () => {
    it('rejects missing capability tokens', () => {
      const payload = asUnknown({
        ...createRequestFixture(),
      })

      delete (payload as Record<string, unknown>).capabilityToken

      expect(() => BridgeEnvelopeSchema.parse(payload)).toThrow()
    })

    it('rejects malformed capability tokens', () => {
      const payload = asUnknown({
        ...createRequestFixture(),
        capabilityToken: 'stolen-token',
      })

      expect(() => BridgeEnvelopeSchema.parse(payload)).toThrow()
    })
  })

  describe('prototype pollution resistance', () => {
    it('rejects __proto__ injection', () => {
      const payload = asUnknown({
        ...createRequestFixture(),
        __proto__: {
          admin: true,
        },
      })

      expect(() => BridgeEnvelopeSchema.parse(payload)).toThrow()
    })

    it('rejects constructor injection', () => {
      const payload = asUnknown({
        ...createRequestFixture(),
        constructor: {
          prototype: {},
        },
      })

      expect(() => BridgeEnvelopeSchema.parse(payload)).toThrow()
    })
  })
})
