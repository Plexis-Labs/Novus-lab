import { MessageServer } from '@novus/message-bus'

import { MessageResgistry } from '../../../../packages/message-bus/src/types/MessageType.js'

import type { RuntimeHealth } from '@novus/contracts'

const server = new MessageServer()

export class HealthMonitor {
  public static initialize(): void {
    console.info('[Novus Runtime] Registering health monitor...')

    server.register<void, RuntimeHealth>(MessageResgistry.PingRuntime, () => ({
      status: 'healthy',
      version: chrome.runtime.getManifest().version,
      timestamp: Date.now(),
    }))

    server.listen()
  }
}
