/**
 * Novus Lab - Primary UI (Side Panel)
 */

interface ChromeResponse {
  version: string
}

function bootstrapSidePanel(): void {
  console.log('[Novus UI] Bootstrapping Side Panel...')

  const statusEl = document.getElementById('status')

  // Verify connection to the Service Worker
  chrome.runtime.sendMessage({ type: 'PING_RUNTIME' }, (response: ChromeResponse) => {
    if (chrome.runtime.lastError) {
      if (statusEl) statusEl.textContent = 'Error: Runtime offline.'
      console.error(chrome.runtime.lastError)
    } else {
      if (statusEl) statusEl.textContent = `Connected (v${response.version})`
      console.log('[Novus UI] Connected to Runtime.')
    }
  })
}

bootstrapSidePanel()
