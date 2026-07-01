import { clone } from '@novus/shared/testing'
import { describe, expect, it } from 'vitest'

import errorFixture from '../../../fixtures/bridge/golden/bridgeEnvelope.error.json'
import requestFixture from '../../../fixtures/bridge/golden/bridgeEnvelope.request.json'
import responseFixture from '../../../fixtures/bridge/golden/bridgeEnvelope.response.json'
import { BridgeEnvelopeSchema } from '../../../src/bridge/bridgeEnvelope.schema'

/**
 * Creates an isolated copy of the request fixture.
 */
function createRequestFixture(): typeof requestFixture {
  return clone(requestFixture)
}

/**
 * Creates an isolated copy of the response fixture.
 */
function createResponseFixture(): typeof responseFixture {
  return clone(responseFixture)
}

/**
 * Creates an isolated copy of the error fixture.
 */
function createErrorFixture(): typeof errorFixture {
  return clone(errorFixture)
}

describe('BridgeEnvelopeSchema', () => {
  describe('request', () => {
    it('accepts a valid request', () => {
      expect(() => BridgeEnvelopeSchema.parse(createRequestFixture())).not.toThrow()
    })

    it('rejects an invalid protocol version', () => {
      const request = createRequestFixture()

      request.header.protocolVersion = 999

      expect(() => BridgeEnvelopeSchema.parse(request)).toThrow()
    })

    it('rejects an invalid correlation id', () => {
      const request = createRequestFixture()

      request.header.correlationId = 'invalid-uuid'

      expect(() => BridgeEnvelopeSchema.parse(request)).toThrow()
    })

    it('rejects an invalid source', () => {
      const request = createRequestFixture()

      request.header.source = 'gateway'

      expect(() => BridgeEnvelopeSchema.parse(request)).toThrow()
    })

    it('rejects an invalid bridge method', () => {
      const request = createRequestFixture()

      request.method = 'workspace.query'

      expect(() => BridgeEnvelopeSchema.parse(request)).toThrow()
    })

    it('rejects a request without a capability token', () => {
      const request = createRequestFixture()

      delete (request as Record<string, unknown>).capabilityToken

      expect(() => BridgeEnvelopeSchema.parse(request)).toThrow()
    })
  })

  describe('response', () => {
    it('accepts a valid response', () => {
      expect(() => BridgeEnvelopeSchema.parse(createResponseFixture())).not.toThrow()
    })
  })

  describe('error', () => {
    it('accepts a valid error response', () => {
      expect(() => BridgeEnvelopeSchema.parse(createErrorFixture())).not.toThrow()
    })

    it('rejects an unknown error code', () => {
      const error = createErrorFixture()

      error.error.code = 'MADE_UP_ERROR'

      expect(() => BridgeEnvelopeSchema.parse(error)).toThrow()
    })

    it('rejects an invalid kind discriminator', () => {
      const error = createErrorFixture()

      error.kind = 'failure'

      expect(() => BridgeEnvelopeSchema.parse(error)).toThrow()
    })
  })
})
