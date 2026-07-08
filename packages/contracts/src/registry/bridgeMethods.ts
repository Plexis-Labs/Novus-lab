/**
 * Canonical Bridge method identifiers.
 *
 * Every RPC crossing the Runtime Bridge must
 * originate from this registry.
 *
 * These identifiers are intentionally namespaced
 * to avoid collisions between Runtime, State,
 * Sandbox and future Feature APIs.
 */
export const BridgeMethod = {
  /**
   * Requests the current Runtime health.
   */
  RuntimePing: 'Novus.runtime.ping',
} as const

/**
 * Union of every supported Bridge method.
 */
export type BridgeMethodType = (typeof BridgeMethod)[keyof typeof BridgeMethod]
