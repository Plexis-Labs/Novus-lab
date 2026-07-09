import { BridgeMethod } from '@novus/contracts'
import { MessageServer } from '@novus/message-bus'

const server = new MessageServer()

export class HealthMonitor {
  public static initialize(): void {
    console.info('[Novus Runtime] Registering health monitor...')

    server.register(BridgeMethod.RuntimePing, () => ({
      status: 'healthy',
      version: chrome.runtime.getManifest().version,
      timestamp: Date.now(),
    }))

    server.listen()
  }
}
