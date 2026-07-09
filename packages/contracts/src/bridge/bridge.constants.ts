/**
 * Current Runtime Bridge protocol version.
 *
 * Every Runtime participant must agree on this
 * value before a request is processed.
 *
 * Incrementing this value represents a breaking
 * transport protocol change.
 */
export const BRIDGE_PROTOCOL_VERSION = 1 as const

export const DEFAULT_BRIDGE_TIMEOUT_MS = 10_000 as const
