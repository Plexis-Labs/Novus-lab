import { useEffect } from 'react'

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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            maxWidth: '420px',
          }}
        >
          <h1
            style={{
              fontSize: '1.35rem',
              marginBottom: '12px',
            }}
          >
            Novus Lab
          </h1>

          <p
            style={{
              color: '#9ca3af',
              lineHeight: 1.6,
            }}
          >
            Runtime initialized.
            <br />
            Ready for workspace feature generation.
          </p>
        </div>
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
