import { clone, jsonRoundTrip } from '@novus/shared/testing'
import { describe, expect, it } from 'vitest'

import errorFixture from '../../../fixtures/bridge/golden/bridgeEnvelope.error.json'
import requestFixture from '../../../fixtures/bridge/golden/bridgeEnvelope.request.json'
import responseFixture from '../../../fixtures/bridge/golden/bridgeEnvelope.response.json'
import { BridgeEnvelopeSchema } from '../../../src/bridge/bridgeEnvelope.schema'

function createRequestFixture(): typeof requestFixture {
  return clone(requestFixture)
}

function createResponseFixture(): typeof responseFixture {
  return clone(responseFixture)
}

function createErrorFixture(): typeof errorFixture {
  return clone(errorFixture)
}

describe('BridgeEnvelope Serialization', () => {
  describe('request', () => {
    it('survives JSON serialization', () => {
      const serialized = jsonRoundTrip(createRequestFixture())

      expect(() => BridgeEnvelopeSchema.parse(serialized)).not.toThrow()
    })

    it('preserves the complete request payload', () => {
      const serialized = jsonRoundTrip(createRequestFixture())

      expect(serialized).toStrictEqual(requestFixture)
    })
  })

  describe('response', () => {
    it('survives JSON serialization', () => {
      const serialized = jsonRoundTrip(createResponseFixture())

      expect(() => BridgeEnvelopeSchema.parse(serialized)).not.toThrow()
    })

    it('preserves the complete response payload', () => {
      const serialized = jsonRoundTrip(createResponseFixture())

      expect(serialized).toStrictEqual(responseFixture)
    })
  })

  describe('error', () => {
    it('survives JSON serialization', () => {
      const serialized = jsonRoundTrip(createErrorFixture())

      expect(() => BridgeEnvelopeSchema.parse(serialized)).not.toThrow()
    })

    it('preserves the complete error payload', () => {
      const serialized = jsonRoundTrip(createErrorFixture())

      expect(serialized).toStrictEqual(errorFixture)
    })
  })

  describe('wire protocol', () => {
    it('remains structurally identical after transport', () => {
      const request = jsonRoundTrip(createRequestFixture())

      expect(request.header.protocolVersion).toBe(1)
      expect(request.kind).toBe('request')
      expect(request.header.source).toBe('sandbox')
    })

    it('does not introduce serialization artifacts', () => {
      const request = jsonRoundTrip(createRequestFixture())

      expect(request).not.toHaveProperty('__proto__')
      expect(request).not.toHaveProperty('constructor')
    })
  })
})
