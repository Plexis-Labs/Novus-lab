import type { RuntimeMessage, RuntimeResponse } from '../types/Message.js'

/**
 * Client responsible for sending messages
 * to the extension runtime.
 */
export class MessageClient {
  /**
   * Dispatch a runtime message.
   */
  public async send<T>(message: RuntimeMessage): Promise<RuntimeResponse<T>> {
    return await new Promise<RuntimeResponse<T>>((resolve, reject) => {
      try {
        chrome.runtime.sendMessage(message, (response: RuntimeResponse<T>) => {
          if (chrome.runtime.lastError !== undefined) {
            reject(new Error(chrome.runtime.lastError.message))
            return
          }

          resolve(response)
        })
      } catch (error) {
        reject(error instanceof Error ? error : new Error(String(error)))
      }
    })
  }
}
