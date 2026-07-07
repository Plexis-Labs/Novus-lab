/**
 * Internal runtime message identifiers.
 *
 * These are temporary until the full
 * contracts package owns the protocol.
 */
export const MessageResgistry = {
  PingRuntime: 'PING_RUNTIME',
} as const

export type MessageType = (typeof MessageResgistry)[keyof typeof MessageResgistry]
