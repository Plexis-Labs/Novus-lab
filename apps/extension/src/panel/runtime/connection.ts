/**
 * Panel Runtime Connection
 *
 * Encapsulates communication between the Side Panel
 * and the Manifest V3 Service Worker.
 *
 * This module intentionally contains no React code.
 */

export type RuntimeStatus = 'healthy' | 'offline'

export interface RuntimeHealth {
  status: RuntimeStatus
  version: string | null
  timestamp: number | null
}

/**
 * Sends a health check request to the Service Worker.
 *
 * The returned promise always resolves. Runtime failures
 * are represented as an "offline" status instead of
 * throwing exceptions.
 */
import { MessageClient } from '@novus/message-bus'

const client = new MessageClient()

export async function pingRuntime(): Promise<RuntimeHealth> {
  const response = await client.send<RuntimeHealth>({
    type: 'PING_RUNTIME',
  })

  if (!response.success || response.data === undefined) {
    throw new Error(response.error ?? 'Runtime did not return a valid response.')
  }

  return response.data
}
