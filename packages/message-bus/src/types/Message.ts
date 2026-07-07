import type { MessageType } from './MessageType.js'

/**
 * Base runtime message exchanged between
 * extension runtimes.
 *
 * Will become a discriminated union in later
 * assignments.
 */
export interface RuntimeMessage {
  readonly type: MessageType
  readonly payload?: unknown
}

/**
 * Standard response envelope returned by
 * the Message Bus.
 */
export interface RuntimeResponse<T = unknown> {
  readonly success: boolean
  readonly data?: T
  readonly error?: string
}
