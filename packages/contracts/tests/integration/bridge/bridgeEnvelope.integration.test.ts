import { describe, it } from 'vitest'

/**
 * Integration tests verify the complete runtime bridge.
 *
 * These tests are intentionally placeholders until
 * the Runtime Dispatcher and SDK are implemented.
 */
describe('BridgeEnvelope Integration', () => {
  describe('runtime bridge', () => {
    it.todo('dispatches a validated request to the correct runtime handler')

    it.todo('returns a successful BridgeResponse from the runtime')

    it.todo('returns a BridgeError when handler validation fails')
  })

  describe('SDK integration', () => {
    it.todo('serializes requests through window.postMessage')

    it.todo('matches asynchronous responses using correlationId')

    it.todo('rejects timed out bridge requests')
  })

  describe('capability engine', () => {
    it.todo('authorizes requests before runtime dispatch')

    it.todo('rejects expired capability tokens')

    it.todo('rejects invalid capability signatures')
  })
})
