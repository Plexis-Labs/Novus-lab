import { BridgeMethod } from '@novus/contracts'
import { MessageClient } from '@novus/message-bus'

const client = new MessageClient()

export class RuntimeBridge {
  public static async connect(): Promise<void> {
    console.info('[Novus Content] Connecting to Runtime...')

    try {
      const response = await client.request(BridgeMethod.RuntimePing, undefined)

      console.info('[Novus Content] Runtime connected.', response)
    } catch (error) {
      console.warn('[Novus Content] Runtime unavailable.', error)
    }
  }
}
