import { useEffect, useState } from 'react'

import { pingRuntime } from '../runtime/connection.js'

import type { RuntimeHealth } from '@novus/contracts'

export interface RuntimeConnectionState {
  readonly status: RuntimeHealth['status'] | 'connecting' | 'error'
  readonly version: string | null
  readonly timestamp: number | null
}

const HEARTBEAT_INTERVAL_MS = 10_000

/**
 * React hook responsible for maintaining the
 * Side Panel's connection state with the
 * Manifest V3 Service Worker.
 */
export function useRuntimeStatus(): RuntimeConnectionState {
  const [state, setState] = useState<RuntimeConnectionState>({
    status: 'connecting',
    version: null,
    timestamp: null,
  })

  useEffect(() => {
    let disposed = false

    const updateRuntimeStatus = async (): Promise<void> => {
      try {
        const runtime = await pingRuntime()

        if (disposed) return

        setState({
          status: runtime.status,
          version: runtime.version,
          timestamp: runtime.timestamp,
        })
      } catch (error) {
        if (disposed) return

        console.log(error)
        setState({
          status: 'error',
          version: null,
          timestamp: Date.now(),
        })
      }
    }

    void updateRuntimeStatus()

    const heartbeat = window.setInterval(() => {
      void updateRuntimeStatus()
    }, HEARTBEAT_INTERVAL_MS)

    return () => {
      disposed = true
      window.clearInterval(heartbeat)
    }
  }, [])

  return state
}
