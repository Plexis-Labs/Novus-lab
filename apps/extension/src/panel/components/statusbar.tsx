import type { RuntimeConnectionState } from '../hooks/useRuntimeStatus.js'
import type { ReactElement } from 'react'

interface StatusBarProps {
  readonly runtime: RuntimeConnectionState
}

const STATUS_COLORS = {
  error: '#cc2b07',
  connecting: '#f59e0b',
  healthy: '#22c55e',
  offline: '#ef4444',
} as const

/**
 * Displays the current health of the Trusted Runtime.
 */
export function StatusBar({ runtime }: StatusBarProps): ReactElement {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        borderBottom: '1px solid #2d3748',
        background: '#18181b',
        fontSize: '12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '999px',
            background: STATUS_COLORS[runtime.status],
          }}
        />

        <span>{runtime.status}</span>
      </div>

      <span>v{runtime.version ?? '---'}</span>
    </header>
  )
}
