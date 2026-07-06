import type { RuntimeConnectionState } from '../hooks/useRuntimeStatus.js'
import type { ReactElement } from 'react'

interface HealthCardProps {
  readonly runtime: RuntimeConnectionState
}

export function HealthCard({ runtime }: HealthCardProps): ReactElement {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
        margin: '24px',
        border: '1px solid #2d3748',
        borderRadius: '10px',
        backgroundColor: '#1f2937',
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: '1rem',
        }}
      >
        Extension Health
      </h2>

      <HealthRow label="Runtime Status" value={runtime.status} />

      <HealthRow label="Version" value={runtime.version ?? '---'} />

      <HealthRow
        label="Last Heartbeat"
        value={
          runtime.timestamp !== null ? new Date(runtime.timestamp).toLocaleTimeString() : '---'
        }
      />

      <HealthRow label="Environment" value="Manifest V3" />
    </section>
  )
}

interface HealthRowProps {
  readonly label: string
  readonly value: string
}

function HealthRow({ label, value }: HealthRowProps): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <span
        style={{
          color: '#9ca3af',
        }}
      >
        {label}
      </span>

      <strong>{value}</strong>
    </div>
  )
}
