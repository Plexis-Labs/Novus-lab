import type { RuntimeConnectionState } from '../hooks/useRuntimeStatus.js'
import type { ReactElement } from 'react'

interface DiagnosticsCardProps {
  readonly runtime: RuntimeConnectionState
}

export function DiagnosticsCard({ runtime }: DiagnosticsCardProps): ReactElement {
  const diagnostics = [
    {
      label: 'Service Worker',
      value: runtime.status === 'healthy' ? 'Running' : 'Offline',
    },
    {
      label: 'Runtime Bridge',
      value: runtime.status === 'healthy' ? 'Connected' : 'Disconnected',
    },
    {
      label: 'Heartbeat',
      value: runtime.timestamp !== null ? 'Receiving' : 'Unavailable',
    },
    {
      label: 'Panel Runtime',
      value: 'Initialized',
    },
  ]

  return (
    <section
      style={{
        margin: '24px',
        padding: '20px',
        border: '1px solid #2d3748',
        borderRadius: '10px',
        background: '#111827',
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: '16px',
        }}
      >
        Runtime Diagnostics
      </h2>

      {diagnostics.map((item) => (
        <div
          key={item.label}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 0',
            borderBottom: '1px solid #1f2937',
          }}
        >
          <span>{item.label}</span>

          <strong>{item.value}</strong>
        </div>
      ))}
    </section>
  )
}
