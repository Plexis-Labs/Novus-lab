/**
 * Novus Lab - Trusted Runtime (Service Worker)
 * This script runs in the background and has full access to Chrome APIs.
 */

interface MessagePayload {
  type: string
}

function bootstrapRuntime(): void {
  console.log('[Novus Runtime] Bootstrapping Service Worker...')

  // Basic health check endpoint for future diagnostics
  chrome.runtime.onMessage.addListener((message: unknown, _sender, sendResponse) => {
    const payload = message as MessagePayload
    if (payload.type === 'PING_RUNTIME') {
      sendResponse({ status: 'healthy', version: chrome.runtime.getManifest().version })
      return true
    }
  })

  console.log('[Novus Runtime] Bootstrap complete.')
}

bootstrapRuntime()
