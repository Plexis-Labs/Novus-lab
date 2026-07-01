import { asUnknown, omit } from '@novus/shared/testing'
import { describe, expect, it } from 'vitest'

import errorFixture from '../../../fixtures/bridge/golden/bridgeEnvelope.error.json'
import requestFixture from '../../../fixtures/bridge/golden/bridgeEnvelope.request.json'
import responseFixture from '../../../fixtures/bridge/golden/bridgeEnvelope.response.json'
import { BridgeEnvelopeSchema } from '../../../src/bridge/bridgeEnvelope.schema'

describe('BridgeEnvelope Contract', () => {
  describe('golden fixtures', () => {
    it('accepts the canonical request fixture', () => {
      expect(() => BridgeEnvelopeSchema.parse(requestFixture)).not.toThrow()
    })

    it('accepts the canonical response fixture', () => {
      expect(() => BridgeEnvelopeSchema.parse(responseFixture)).not.toThrow()
    })

    it('accepts the canonical error fixture', () => {
      expect(() => BridgeEnvelopeSchema.parse(errorFixture)).not.toThrow()
    })
  })

  describe('required protocol fields', () => {
    it('requires the bridge header', () => {
      expect(() => BridgeEnvelopeSchema.parse(omit(requestFixture, 'header'))).toThrow()
    })

    it('requires the message discriminator', () => {
      expect(() => BridgeEnvelopeSchema.parse(omit(requestFixture, 'kind'))).toThrow()
    })

    it('requires the capability token for requests', () => {
      expect(() => BridgeEnvelopeSchema.parse(omit(requestFixture, 'capabilityToken'))).toThrow()
    })

    it('requires the RPC method', () => {
      expect(() => BridgeEnvelopeSchema.parse(omit(requestFixture, 'method'))).toThrow()
    })

    it('requires the payload', () => {
      expect(() => BridgeEnvelopeSchema.parse(omit(requestFixture, 'payload'))).toThrow()
    })
  })

  describe('strict protocol enforcement', () => {
    it('rejects undocumented root properties', () => {
      const tampered = asUnknown({
        ...requestFixture,
        injected: true,
      })

      expect(() => BridgeEnvelopeSchema.parse(tampered)).toThrow()
    })

    it('rejects undocumented header properties', () => {
      const tampered = asUnknown({
        ...requestFixture,
        header: {
          ...requestFixture.header,
          injected: true,
        },
      })

      expect(() => BridgeEnvelopeSchema.parse(tampered)).toThrow()
    })

    it('rejects undocumented error properties', () => {
      const tampered = asUnknown({
        ...errorFixture,
        error: {
          ...errorFixture.error,
          stackTrace: 'secret',
        },
      })

      expect(() => BridgeEnvelopeSchema.parse(tampered)).toThrow()
    })
  })

  describe('protocol invariants', () => {
    it('shares the same correlation id between request and response', () => {
      expect(requestFixture.header.correlationId).toBe(responseFixture.header.correlationId)
    })

    it('shares the same correlation id between request and error', () => {
      expect(requestFixture.header.correlationId).toBe(errorFixture.header.correlationId)
    })

    it('uses protocol version 1 across every fixture', () => {
      expect(requestFixture.header.protocolVersion).toBe(1)
      expect(responseFixture.header.protocolVersion).toBe(1)
      expect(errorFixture.header.protocolVersion).toBe(1)
    })

    it('uses the correct message sources', () => {
      expect(requestFixture.header.source).toBe('sandbox')
      expect(responseFixture.header.source).toBe('runtime')
      expect(errorFixture.header.source).toBe('runtime')
    })
  })
})
