/**
 * Runtime Health Monitor
 *
 * Responds to health checks from other extension
 * entry points.
 */

interface message {
  type: string
}
export class HealthMonitor {
  public static initialize(): void {
    console.info('[Novus Runtime] Registering health monitor...')

    chrome.runtime.onMessage.addListener((message: message, _sender, sendResponse) => {
      if (message.type !== 'PING_RUNTIME') {
        return
      }

      sendResponse({
        status: 'healthy',
        version: chrome.runtime.getManifest().version,
        timestamp: Date.now(),
      })
    })
  }
}
