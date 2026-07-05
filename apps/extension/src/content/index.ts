/**
 * Novus Lab - Content Script
 * Injected into approved host pages to manage adapters and iframe mounting.
 */

function bootstrapContentScript(): void {
  // Prevent duplicate injections (Vite HMR can sometimes trigger this)
  if (Object.prototype.hasOwnProperty.call(window, 'NOVUS_INJECTED')) {
    return
  }
  Object.defineProperty(window, '__NOVUS_INJECTED__', { value: true, writable: false })

  console.log(`[Novus Content] Injected into host: ${window.location.hostname}`)

  // Ping the runtime to verify the communication bridge is open
  chrome.runtime.sendMessage({ type: 'PING_RUNTIME' }, (response) => {
    if (chrome.runtime.lastError) {
      console.warn('[Novus Content] Runtime disconnected or sleeping.')
    } else {
      console.log('[Novus Content] Successfully connected to Runtime:', response)
    }
  })
}

bootstrapContentScript()
