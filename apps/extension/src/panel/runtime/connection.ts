import { RuntimeHealthSchema, type RuntimeHealth } from '@novus/contracts'
import { MessageClient } from '@novus/message-bus'

/**
 * Panel Runtime Connection
 *
 * Encapsulates communication between the Side Panel
 * and the Manifest V3 Service Worker.
 *
 * Owns:
 * - Runtime RPC invocation
 * - Runtime payload validation
 *
 * Does NOT own:
 * - React state
 * - UI
 * - Transport implementation
 */

const client = new MessageClient()

/**
 * Requests the current Runtime health.
 *
 * Every Bridge payload crossing the runtime
 * boundary is validated before entering the
 * React application.
 */
export async function pingRuntime(): Promise<RuntimeHealth> {
  const response = await client.request('PING_RUNTIME')

  if (response.kind === 'error') {
    throw new Error(response.error.message)
  }

  const result = RuntimeHealthSchema.safeParse(response.payload)

  if (!result.success) {
    throw new Error('Runtime returned an invalid RuntimeHealth payload.')
  }

  return result.data
}
