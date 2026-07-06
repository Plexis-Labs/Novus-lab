import { useEffect } from 'react'

import { DiagnosticsCard } from './components/DiagnosticsCard.js'
import { HealthCard } from './components/HealthCard.js'
import { StatusBar } from './components/statusbar.js'
import { useRuntimeStatus } from './hooks/useRuntimeStatus.js'
import { PanelRuntime } from './runtime/runtime.js'

import type { ReactElement } from 'react'

/**
 * Root application shell for the Novus Side Panel.
 *
 * Owns:
 * - Runtime state
 * - Global layout
 * - Future providers
 */
export default function App(): ReactElement {
  const runtime = useRuntimeStatus()

  useEffect(() => {
    PanelRuntime.bootstrap()

    return () => {
      PanelRuntime.shutdown()
    }
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        background: '#111827',
        color: '#f9fafb',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <StatusBar runtime={runtime} />

      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '28px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <section
          style={{
            textAlign: 'center',
            paddingBottom: '8px',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: '1.6rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
            }}
          >
            Novus Lab
          </h1>

          <p
            style={{
              marginTop: '12px',
              color: '#8b8b92',
              lineHeight: 1.7,
              fontSize: '14px',
            }}
          >
            AI-generated persistent workspace augmentation.
          </p>
        </section>

        <HealthCard runtime={runtime} />

        <DiagnosticsCard runtime={runtime} />
      </main>

      <footer
        style={{
          borderTop: '1px solid #2d3748',
          padding: '8px 12px',
          fontSize: '12px',
          color: '#6b7280',
        }}
      >
        Trusted Runtime • Manifest V3
      </footer>
    </div>
  )
}
