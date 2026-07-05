import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

import type { ReactElement } from 'react'

interface ChromeResponse {
  version: string
}

function SidePanel(): ReactElement {
  const [status, setStatus] = useState<string>('Initializing...')

  useEffect(() => {
    console.log('[Novus UI] Bootstrapping Side Panel...')

    // Verify connection to the Service Worker
    chrome.runtime.sendMessage({ type: 'PING_RUNTIME' }, (response: ChromeResponse) => {
      if (chrome.runtime.lastError) {
        setStatus('Error: Runtime offline.')
        console.error(chrome.runtime.lastError)
      } else {
        setStatus(`Connected (v${response?.version ?? 'unknown'})`)
        console.log('[Novus UI] Connected to Runtime.')
      }
    })
  }, [])

  return (
    <div style={{ padding: '16px' }}>
      <h1>Novus Lab</h1>
      <p>{status}</p>
    </div>
  )
}

// Mount the React application
const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<SidePanel />)
}
