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

const PING_MESSAGE = {
  type: 'PING_RUNTIME',
} as const

/**
 * Sends a health check request to the Service Worker.
 *
 * The returned promise always resolves. Runtime failures
 * are represented as an "offline" status instead of
 * throwing exceptions.
 */
export async function pingRuntime(): Promise<RuntimeHealth> {
  return new Promise<RuntimeHealth>((resolve) => {
    try {
      chrome.runtime.sendMessage(PING_MESSAGE, (response: RuntimeHealth) => {
        if (chrome.runtime.lastError !== undefined) {
          console.warn('[Novus Panel] Runtime unavailable:', chrome.runtime.lastError.message)

          resolve({
            status: 'offline',
            version: null,
            timestamp: null,
          })

          return
        }

        resolve({
          status: response.status,
          version: response.version,
          timestamp: response.timestamp,
        })
      })
    } catch (error) {
      console.error('[Novus Panel] Failed to contact runtime.', error)

      resolve({
        status: 'offline',
        version: null,
        timestamp: null,
      })
    }
  })
}
