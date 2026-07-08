import type { BridgeMethod } from './bridgeMethods.js'
import type { RuntimeHealth } from '../runtime/runtimeHealth.types.js'

/**
 * Canonical mapping between every Bridge
 * method and its transport contract.
 *
 * The registry is the single source of truth
 * used by the Message Bus to infer request
 * payloads and response payloads.
 *
 * New Bridge APIs MUST be registered here.
 */
export interface BridgeRegistry {
  [BridgeMethod.RuntimePing]: {
    payload: void
    response: RuntimeHealth
  }
}
