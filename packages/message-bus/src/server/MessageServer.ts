import type { RuntimeMessage, RuntimeResponse } from '../types/Message.js'

/**
 * Handler invoked when a runtime message
 * of a registered type is received.
 */
export type MessageHandler = (
  message: RuntimeMessage,
  sender: chrome.runtime.MessageSender,
) => unknown

/**
 * Central runtime message router.
 *
 * Owns:
 * - handler registration
 * - message dispatch
 * - chrome.runtime integration
 */
export class MessageServer {
  private readonly handlers = new Map<string, MessageHandler>()

  private listening = false

  /**
   * Register a handler for a message type.
   */
  public register(type: string, handler: MessageHandler): void {
    if (this.handlers.has(type)) {
      console.warn(`[MessageServer] Overwriting handler "${type}".`)
    }

    this.handlers.set(type, handler)
  }

  /**
   * Attach the Chrome runtime listener.
   * Safe to call multiple times.
   */
  public listen(): void {
    if (this.listening) {
      return
    }

    this.listening = true

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      void this.handleMessage(message as RuntimeMessage, sender, sendResponse)

      return true
    })
  }

  private async handleMessage(
    message: RuntimeMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: RuntimeResponse) => void,
  ): Promise<void> {
    const handler = this.handlers.get(message.type)

    if (handler === undefined) {
      sendResponse({
        success: false,
        error: `No handler registered for "${message.type}".`,
      })

      return
    }

    try {
      const result = await handler(message, sender)

      sendResponse({
        success: true,
        data: result,
      })
    } catch (error) {
      sendResponse({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown MessageBus error.',
      })
    }
  }
}
